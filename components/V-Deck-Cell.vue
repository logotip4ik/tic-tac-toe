<template>
  <button class="cell" @click="$emit('click')">
    <span>{{ char }}</span>
  </button>
</template>

<script>
export default {
  props: { value: { type: Number, required: true, default: 0 } },
  computed: {
    char() {
      return this.value === 0 ? '' : this.value === 1 ? 'X' : 'O'
    },
  },
}
</script>

<style lang="scss">
.cell {
  $size: 25vmin;
  width: $size;
  height: $size;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  background-color: transparent;
  appearance: none;
  border-radius: 0;
  transition: background-color var(--transition);
  font-size: 3rem;

  &:hover,
  &:focus {
    transition: none;
    background-color: #ccc;
  }

  @media (prefers-color-scheme: dark) {
    color: whitesmoke;
  }
}
</style>
