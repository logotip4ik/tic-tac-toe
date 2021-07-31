<template>
  <Nuxt></Nuxt>
</template>

<script>
export default {}
</script>

<style>
:root {
  --transition: 0.3s ease;
  --shadow-dark: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);

  --light-color: #e5e5e5;
  --dark-color: #14213d;
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
