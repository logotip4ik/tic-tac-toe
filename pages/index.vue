<template>
  <div class="main">
    <h1>🎲Tic Tac Toe🎲</h1>
    <div class="main__buttons">
      <button>Create game</button>
      <button>Join game</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
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
