<template>
  <Nuxt></Nuxt>
</template>

<script>
export default {}
</script>

<style>
:root {
  --transition: 0.3s ease;
}
* {
  box-sizing: border-box;
  margin: 0;
}
html,
body {
  min-height: 100vh;
  font-family: system-ui, sans-serif;
}
#__nuxt,
#__layout {
  min-height: 100vh;
  background-color: #e5e5e5;
  color: black;
  transition: color var(--transition), background-color var(--transition);
}

@media (prefers-color-scheme: dark) {
  #__nuxt,
  #__layout {
    background-color: #14213d;
    color: whitesmoke;
  }
}
</style>
