<template>
  <div>
    <div v-if="!gamedoc.player2" class="qrcode">
      <canvas ref="qrcode"></canvas>
    </div>
    <pre>
      {{ gamedoc }}
    </pre>
  </div>
</template>

<script>
// import fire from 'firebase'
import qrcode from 'qrcode'

export default {
  asyncData({ params, redirect, query }) {
    if (!params.id) return redirect('/')
    if (!query.initial) return { title: 'Connect to play tictactoe' }
  },
  data: () => ({
    gamedoc: {},
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
    setupListener(shared) {
      const docPath = `games/${this.$route.params.id}`

      this.$fire.auth.signInAnonymously().then(({ user }) => {
        document.title = 'Tic Tac Toe'
        this.user = user
        if (shared)
          this.$fire.firestore
            .doc(docPath)
            .set({ player2: user.uid }, { merge: true })
        this.$fire.firestore
          .doc(docPath)
          .onSnapshot((doc) => (this.gamedoc = doc.data()))
      })
    },
    signin() {},
    showShare() {
      const shareHref = `${location.origin}${location.pathname}`
      qrcode.toCanvas(this.$refs.qrcode, shareHref)
    },
    deleteGame() {
      this.$fire.firestore
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
}
</style>
