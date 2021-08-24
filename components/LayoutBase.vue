<template>
  <div class="base-wrapper">
    <div class="base-container">
      <TheHeader />
      <div class="base-content">
        <span class="base-title">
          {{ pageTitle }}
        </span>
        <slot />
      </div>
      <TheFooter />
    </div>
  </div>
</template>

<script>
import homePage from '@/utils/homePage';

export default {
  name: 'LayoutBase',
  props: {},
  data() {
    return {};
  },
  computed: {
    pageTitle() {
      if (homePage.includes(this.$route.path)) {
        return this.$t('Latest Transactions');
      }
      const pathArr = this.$route.path.split('/');
      return pathArr[pathArr.length - 1];
    },
  },
};
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

.base-content {
  margin-bottom: 10px;
  padding: 10px;
  background-color: $colorFiller;
  border-radius: 8px;

  +mediaDesktop() {
    margin-bottom: 24px;
    padding: 16px 24px 24px;
  }
}

.base-title {
  display: block;
  margin-bottom: 24px;
  color: $colorFontBase;
  getFontSubtitle();
  opacity: 0.4;
}
</style>
