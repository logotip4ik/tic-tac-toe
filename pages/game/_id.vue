<template>
  <div class="main">
    <transition name="page">
      <div v-if="$route.query.initial && !gamedoc.player2" class="overlay">
        <canvas ref="qrcode"></canvas>
        OR
        <span>
          Enter this code: <br /><code>{{ $route.params.id }}</code>
        </span>
      </div>
    </transition>
    <transition name="page">
      <div v-if="gamedoc.winner" class="overlay main__buttons">
        <h1>
          {{ winString }}
        </h1>
        <button @click="restart">Play again</button>
      </div>
    </transition>
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
  beforeRouteLeave(_, __, next) {
    this.deleteGame()
    next()
  },
  asyncData({ params, redirect }) {
    if (!params.id) return redirect('/')
  },
  data: () => ({
    gamedoc: {},
    doc: {},
    user: {},
  }),
  computed: {
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
    winString() {
      if (typeof this.gamedoc.win === 'string') {
        if (this.user.uid === this.gamedoc.winner) return 'You win!'
        return 'Opponent win!'
      }
      return 'Tie'
    },
  },
  watch: {
    gamedoc({ steps }) {
      const docPath = `games/${this.gamedoc.id}`
      if (steps === 9)
        this.$fire.firestore.doc(docPath).set({ winner: 1 }, { merge: true })
    },
  },
  mounted() {
    const { query } = this.$route
    if (query.initial) this.showShare()
    this.setupListener(!query.initial)
    document.title = 'Tic Tac Toe'
  },
  beforeDestroy() {
    // this.deleteGame()
  },
  methods: {
    restart() {
      const docPath = `games/${this.gamedoc.id}`
      const newDeck = {}
      // Firebase does not allow nested arrays
      for (let i = 0; i < 3; i++) {
        newDeck[i] = Array(3).fill(0)
      }
      this.$fire.firestore.doc(docPath).set(
        {
          steps: 0,
          winner: null,
          deck: newDeck,
          player1: this.gamedoc.player2,
          player2: this.gamedoc.player1,
        },
        { merge: true }
      )
    },
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
        .finally(() => {
          const winner = this.checkWin()
          if (!winner) return
          this.$fire.firestore.doc(docPath).set({ winner }, { merge: true })
        })
    },
    setupListener(shared) {
      const docPath = `games/${this.$route.params.id}`

      this.$fire.auth.signInAnonymously().then(async ({ user }) => {
        document.title = 'Tic Tac Toe'
        this.user = user
        if (shared) {
          const doc = this.$fire.firestore.doc(docPath)
          const { exists } = await doc.get()
          if (!exists) return this.$router.push('/')
          doc.set({ player2: user.uid }, { merge: true })
        }
        this.$fire.firestore.doc(docPath).onSnapshot((doc) => {
          if (!doc.exists) return this.$router.push('/')
          this.gamedoc = doc.data()
        })
      })

      window.onbeforeunload = async () => {
        await this.deleteGame()
        return 'Are you sure you want to leave ?'
      }
    },
    checkWin() {
      for (let i = 0; i < 3; i++) {
        let rowSum = 0
        for (let j = 0; j < 3; j++) {
          rowSum += this.gamedoc.deck[i][j]
        }
        if (rowSum === 3) return this.gamedoc.player1
        else if (rowSum === -3) return this.gamedoc.player2
      }

      for (let i = 0; i < 3; i++) {
        let colSum = 0
        for (let j = 0; j < 3; j++) {
          colSum += this.gamedoc.deck[j][i]
        }
        if (colSum === 3) return this.gamedoc.player1
        else if (colSum === -3) return this.gamedoc.player2
      }

      if (
        this.gamedoc.deck[0][0] +
          this.gamedoc.deck[1][1] +
          this.gamedoc.deck[2][2] ===
        3
      )
        return this.gamedoc.player1
      else if (
        this.gamedoc.deck[0][0] +
          this.gamedoc.deck[1][1] +
          this.gamedoc.deck[2][2] ===
        -3
      )
        return this.gamedoc.player2

      if (
        this.gamedoc.deck[2][0] +
          this.gamedoc.deck[1][1] +
          this.gamedoc.deck[0][2] ===
        3
      )
        return this.gamedoc.player1
      else if (
        this.gamedoc.deck[2][0] +
          this.gamedoc.deck[1][1] +
          this.gamedoc.deck[0][2] ===
        -3
      )
        return this.gamedoc.player2

      return null
    },
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
.overlay {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 100vw;
  height: 100vh;
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
    user-select: all;
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
