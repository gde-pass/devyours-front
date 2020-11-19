<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<style lang="scss">
html {
  background-color: $primary;
}
body {
  // FONT
  font-family: $font-family-base;
  font-size: 16px;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5;
  color: $gray-900;
  text-align: left;
  // SPACING
  margin: 0;
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }
}
</style>
