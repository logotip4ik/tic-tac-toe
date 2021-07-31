<template>
  <div class="main">
    <h1>🎲Tic Tac Toe🎲</h1>
    <div class="main__buttons">
      <button @click="createGame">Create game</button>
      <button>Join game</button>
    </div>
  </div>
</template>

<script>
import { nanoid } from 'nanoid'

export default {
  methods: {
    createGame() {
      const gamedoc = {
        id: nanoid(9),
        player1: null,
        player2: null,
        steps: [],
      }
      console.log(this.$fire.auth(), gamedoc)
      // this.$fire
      //   .auth()
      //   .signInAnonymously()
      //   .then((user) => {
      //     gamedoc.player1 = user.uid
      //     this.$fire
      //       .firestore()
      //       .doc(gamedoc.id)
      //       .set(gamedoc)
      //       .then(() =>
      //         this.$router.push({ name: 'game-id', params: gamedoc.id })
      //       )
      //   })
      //   .catch((error) => {
      //     console.warn(error)
      //     // var errorCode = error.code;
      //     // var errorMessage = error.message;
      //   })
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
  align-content: center;
  gap: 3rem;

  &__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    button {
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
