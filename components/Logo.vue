<template>
  <div class="logoBox"><svg-icon name="common/logo" class="logo" />.</div>
</template>

<script>
export default {
  name: 'Logo',
}
</script>

<style lang="stylus" scoped>
.logoBox {
  display: flex;
  align-items: flex-end;
  justify-content: center;

  mediaDesktop() {
    justify-content: unset;
  }
}

.logo {
  width: 88px;
  height: 48px;
  color: #182f37;

  &:hover {
    color: #ef616a;
  }
}
</style>
