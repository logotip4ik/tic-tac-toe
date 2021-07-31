<template>
  <transition :css="false" @enter="enterAnim" @leave="leaveAnim">
    <div v-if="value" class="modal">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import gsap from 'gsap'

export default {
  props: { value: { type: Boolean, required: true, default: false } },
  methods: {
    enterAnim(el, onComplete) {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 1.5 },
        { opacity: 1, scale: 1, ease: 'back.out', onComplete }
      )
    },
    leave(el, onComplete) {
      gsap.to(el, { opacity: 0, scale: 0.6, onComplete })
    },
  },
}
</script>

<style></style>
