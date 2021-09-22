<template>
  <div class="base-content">
    <div class="base-content-inner">
      <span v-if="$slots.title" class="base-title">
        <slot name="title" />
      </span>
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: "CommonContentBlockWrapper",
};
</script>

<style lang="stylus" scoped>
.base-content {
  flex-grow: 1;
}

.base-content-inner {
  padding: 10px;
  border-radius: 8px;
  background-color: $colorFiller;

  +mediaDesktop() {
    padding: 16px 24px 24px;
  }
}

.base-title {
  display: block;
  margin-bottom: 10px;
  color: $colorFontBase;
  getFontSubtitle();
  line-height: 15px;
  opacity: 0.4;

  +mediaTablet() {
    margin-bottom: 18px;
  }
}
</style>
