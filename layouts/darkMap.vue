<template>
  <div class="base-wrapper dark-mode base-map">
    <div class="base-box">
      <TheHeader />
      <Nuxt />
      <TheFooter />
    </div>
  </div>
</template>

<script>

export default {
  name: 'DarkMap'
}
</script>

<style lang="stylus">
.base-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  background-color: $colorBg;
}

.base-box {
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  margin: auto;
  width: 94%;
  max-width: 480px;
  min-height: 100vh;

  +mediaTablet() {
    width: 100%;
    max-width: 750px;
    padding: 0 15px;
  }

  +mediaDesktop() {
    max-width: 1150px;
  }
}

.base-map {
  .footerBox {
    padding-top: 0 !important;
  }
}
</style>
