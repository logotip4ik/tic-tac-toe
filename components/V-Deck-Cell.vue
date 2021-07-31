<template>
  <div class="cell" @click="$emit('click')">
    <span>{{ char }}</span>
  </div>
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
  transition: background-color var(--transition);

  &:hover,
  &:focus {
    transition: none;
    background-color: #ccc;
  }
}
</style>
