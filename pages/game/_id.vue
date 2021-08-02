<template>
  <div class="main">
    <div v-if="!gamedoc || !gamedoc.player2" class="qrcode">
      <canvas ref="qrcode"></canvas>
      OR
      <span
        >Enter this code: <br /><code>{{ $route.params.id }}</code></span
      >
    </div>
    <h2 class="turn">
      {{ currTurn === 1 ? 'Your turn' : 'Opponent Turn' }}
    </h2>
    <VDeck :deck="gamedoc.deck" @toggle-cell="toggleCell"></VDeck>
  </div>
</template>

<script>
// import fire from 'firebase'
import qrcode from 'qrcode'

export default {
  async beforeRouteLeave() {
    await this.deleteGame()
  },
  asyncData({ params, redirect, query }) {
    if (!params.id) return redirect('/')
    if (!query.initial) return { title: 'Connect to play tictactoe' }
  },
  data: () => ({
    gamedoc: {},
    doc: {},
    user: {},
  }),
  head() {
    return {
      title: this.title || 'Tic Tac Toe',
    }
  },
  computed: {
    initial() {
      return this.$route.query.initial || false
    },
    currTurn() {
      if (!this.gamedoc) return 0
      const isEven = this.gamedoc.steps % 2 === 0
      const isPlayer1 = this.gamedoc.player1 === this.user.uid

      if (isPlayer1 && isEven) return 1
      if (isPlayer1 && !isEven) return -1
      if (!isPlayer1 && !isEven) return 1
      if (!isPlayer1 && isEven) return -1

      return 0
    },
  },
  mounted() {
    const { query } = this.$route
    if (query.initial) this.showShare()
    this.signin()
    this.setupListener(!query.initial)
  },
  beforeDestroy() {
    this.deleteGame()
  },
  methods: {
    getCellValue() {
      const isEven = this.gamedoc.steps % 2 === 0
      if (this.gamedoc.player1 === this.user.uid) {
        if (isEven) return 1
      } else if (this.gamedoc.player2 === this.user.uid) {
        if (!isEven) return -1
      }
      return 0
    },
    toggleCell({ x, y }) {
      const cellValue = this.getCellValue()
      if (cellValue === 0) return
      const docPath = `games/${this.gamedoc.id}`
      const deck = {
        ...this.gamedoc.deck,
        [x]: this.gamedoc.deck[x].map((val, idx) =>
          idx === y ? this.getCellValue() : val
        ),
      }
      this.$fire.firestore
        .doc(docPath)
        .set({ ...this.gamedoc, deck, steps: this.gamedoc.steps + 1 })
    },
    setupListener(shared) {
      const docPath = `games/${this.$route.params.id}`

      this.$fire.auth.signInAnonymously().then(({ user }) => {
        document.title = 'Tic Tac Toe'
        this.user = user
        if (shared) {
          this.doc = this.$fire.firestore.doc(docPath)
          this.doc.set({ player2: user.uid }, { merge: true })
        }
        this.$fire.firestore
          .doc(docPath)
          .onSnapshot((doc) => (this.gamedoc = doc.data()))
      })

      window.onbeforeunload = async () => {
        await this.deleteGame()
        return 'Are you sure you want to leave ?'
      }
    },
    signin() {},
    showShare() {
      const shareHref = `${location.origin}${location.pathname}`
      qrcode.toCanvas(this.$refs.qrcode, shareHref)
    },
    async deleteGame() {
      await this.$fire.firestore
        .collection('games')
        .doc(this.$route.params.id)
        .delete()
        .finally(() => this.$router.push('/'))
    },
  },
}
</script>

<style lang="scss">
.qrcode {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 100vw;
  height: 100vw;
  background-color: var(--light-color);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 1rem;

  @media (prefers-color-scheme: dark) {
    background-color: var(--dark-color);
  }

  code {
    line-height: 2;
    padding: 0.25rem;
    border-radius: 0.25rem;
    background-color: rgba($color: #000000, $alpha: 0.5);
    color: #ddd;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
}
.main {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
}
</style>
