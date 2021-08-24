<template>
  <svg-icon name="common/logo" class="logo" />
</template>

<script>
export default {
  name: 'Logo',
};
</script>

<style lang="stylus" scoped>
.logo {
  display: block;
  width: 88px;
  height: 48px;
  color: $colorFontBase;
  transition: all 0.1s;

  &:hover {
    color: $colorDanger;
  }
}
</style>
