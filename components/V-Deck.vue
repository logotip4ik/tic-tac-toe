<template>
  <div class="deck">
    <div v-for="(row, xId) in deck" :key="xId" class="row">
      <div v-for="(val, yId) in row" :key="xId + yId + val">
        <VDeckCell
          :value="val"
          @click="$emit('toggle-cell', { x: xId, y: yId })"
        ></VDeckCell>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { deck: { type: Object, required: true, default: () => ({}) } },
}
</script>

<style>
.deck {
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.row {
  display: flex;
}
</style>
