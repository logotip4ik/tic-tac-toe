<template>
  <div class="main">
    <h1>🎲Tic Tac Toe🎲</h1>
    <div class="main__buttons">
      <button @click="createGame">Create game</button>
      <NuxtLink to="/join">Join game</NuxtLink>
    </div>
    <VModal v-model="showingJoin">
      <h2 class="main__modal__heading">Enter the code:</h2>
      <input v-model="joinCode" class="main__modal__input" />
      <button class="main__modal__button">Join</button>
    </VModal>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'
// import { fire } from '~/firebase'

export default {
  data: () => ({
    showingJoin: false,
    joinCode: '',
  }),
  methods: {
    createGame() {
      const gamedoc = this.createGameDoc()

      this.$fire.auth
        .signInAnonymously()
        .then(({ user }) => {
          gamedoc.player1 = user.uid
          this.$fire.firestore
            .collection('games')
            .doc(gamedoc.id)
            .set(gamedoc)
            .then(() =>
              this.$router.push({
                name: 'game-id',
                params: { id: gamedoc.id },
                query: { initial: true },
              })
            )
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.warn(error)
        })
    },
    createGameDoc() {
      const gamedoc = {
        id: nanoid(8),
        player1: null,
        player2: null,
        deck: {},
        steps: 0,
        winner: null,
      }
      for (let i = 0; i < 3; i++) {
        gamedoc.deck[i] = Array(3).fill(0)
      }
      return gamedoc
    },
  },
}
</script>

<style lang="scss">
.main {
  width: 100%;
  max-width: 700px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  &__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    button,
    a {
      padding: 0.75rem 1.5rem;
      font: inherit;
      font-size: 1rem;
      text-transform: uppercase;
      color: currentColor;
      appearance: none;
      border: 1px solid transparent;
      border-radius: 0.25rem;
      background-color: transparent;
      box-shadow: var(--shadow-dark);
      cursor: pointer;
      text-decoration: none;
      transition: background-color var(--transition),
        border-color var(--transition);

      &:hover,
      &:focus {
        transition: none;
        background-color: #fafafa;
      }

      @media (prefers-color-scheme: dark) {
        border-color: rgba($color: #fafafa, $alpha: 0.1);
        &:hover,
        &:focus {
          background-color: #32539a;
        }
      }
    }
  }
}
</style>
