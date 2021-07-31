<template>
  <div>
    {{ $route.name }}
    {{ initial }}
    <canvas ref="qrcode" class="qrcode"></canvas>
    {{ player1 }}
    {{ player2 }}
  </div>
</template>

<script>
import fire from 'firebase'
import qrcode from 'qrcode'

export default {
  async asyncData({ query, params, redirect }) {
    if (!params.id) return redirect('/')
    const doc = fire.firestore().doc(`games/${params.id}`)
    const data = (await doc.get()).data()
    if (!query.initial && data.player1 && !data.player2) return
    const { user } = await fire.auth().signInAnonymously()
    doc.set({ player2: user.uid }, { merge: true })
  },
  data: () => ({
    player1: null,
    player2: null,
  }),
  computed: {
    initial() {
      return this.$route.query.initial || false
    },
  },
  mounted() {
    const { query } = this.$route
    if (query.initial) this.showShare()
    this.setupListener()
  },
  beforeDestroy() {
    this.deleteGame()
  },
  methods: {
    setupListener() {
      const docPath = `games/${this.$route.params.id}`
      fire
        .firestore()
        .doc(docPath)
        .onSnapshot((doc) => {
          const data = doc.data()
          Object.keys(data).forEach((key) =>
            this[key] !== data[key] ? (this[key] = data[key]) : null
          )
        })
    },
    showShare() {
      const shareHref = `${location.origin}${location.pathname}`
      qrcode.toCanvas(this.$refs.qrcode, shareHref)
    },
    deleteGame() {
      fire
        .firestore()
        .collection('games')
        .doc(this.$route.params.id)
        .delete()
        .finally(() => this.$router.push('/'))
    },
  },
}
</script>

<style></style>
