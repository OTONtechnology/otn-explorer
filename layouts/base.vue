<template>
  <div class="base-wrapper">
    <div class="base-container">
      <TheHeader />
      <Nuxt />
      <TheFooter />
    </div>
  </div>
</template>

<script>

export default {
  name: "Base"
}
</script>

<style lang="stylus" scoped>
.base-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: $colorBg;
}

.base-container {
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  margin: auto;
  width: 100%;
  max-width: 1120 + 30 px;
  min-height: 100vh;

  +mediaDesktop() {
    padding: 0 15px;
  }
}
</style>
