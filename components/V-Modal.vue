<template>
  <transition :css="false" @enter="enterAnim" @leave="leaveAnim">
    <div
      v-if="value"
      ref="modal"
      v-click-outside="$emit('input', false)"
      class="modal"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import gsap from 'gsap'

export default {
  props: { value: { type: Boolean, required: true, default: false } },
  watch: {
    value(val) {
      console.log(val)
      // if (val) return window.addEventListener('click', this.listener)
      // window.removeEventListener('click', this.listener)
    },
  },
  methods: {
    listener({ target }) {
      return target !== this.$refs.modal ? this.$emit('input', false) : null
    },
    enterAnim(el, onComplete) {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 1.5 },
        { opacity: 1, scale: 1, ease: 'back.out', onComplete }
      )
    },
    leaveAnim(el, onComplete) {
      gsap.to(el, { opacity: 0, scale: 0.6, ease: 'back.in', onComplete })
    },
  },
}
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 90vw;
  max-width: 650px;
  min-height: 300px;
  box-shadow: var(--shadow-dark);
  padding: 2rem 1rem;
  border-radius: 0.25rem;
  background-color: var(--light-color);

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (prefers-color-scheme: dark) {
    background-color: var(--dark-color);
  }
}
</style>
