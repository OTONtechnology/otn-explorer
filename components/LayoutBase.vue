<template>
  <div class="base-wrapper">
    <div class="base-container">
      <LayoutHeader />
      <div class="base-content">
        <slot />
      </div>
      <LayoutFooter />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutBase'
}
</script>

<style lang="stylus" scoped>
@import '~/assets/styles/vars.styl';

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

.base-content {
  +mediaDesktop() {
    margin-left: -12px;
    margin-right: -12px;
  }
}
</style>
