<template>
  <div class="main">
    <h1>Enter Code</h1>
    <input v-model="joinCode" class="main__input" />
    <div class="main__buttons">
      <button :disabled="!showButton" @click="join">Join</button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    joinCode: '',
  }),
  computed: {
    showButton() {
      return this.joinCode.length === 8
    },
  },
  methods: {
    join() {
      if (this.joinCode.length !== 8) return
      try {
        this.$router.push({ name: 'game-id', params: { id: this.joinCode } })
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss">
.main {
  max-width: 600px;

  &__input {
    appearance: none;
    border: none;
    border: none;
    border-bottom: 1px solid #ccc;
    font: inherit;
    font-size: 1.1rem;
    text-align: center;
    background-color: transparent;
    outline: none;
    max-width: 450px;
    width: 100%;
    color: currentColor;
  }
  &__button {
    padding: 0.5rem 1.5rem;
    font: inherit;
    text-transform: uppercase;
    border-radius: 0.25rem;
    border: 1px solid transparent;
    background: transparent;
    box-shadow: var(--shadow-dark);
    cursor: pointer;
    color: currentColor;

    transition: border-color var(--transition);

    &:focus,
    &:hover {
      transition: none;
      border-color: #ccc;
    }
  }

  @media (prefers-color-scheme: dark) {
  }
}
</style>
