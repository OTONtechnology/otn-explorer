<template>
  <div class="headerContainer">
    <header class="header">
      <nuxt-link class="logoWrapper" :to="localePath('index')">
        <Logo />
      </nuxt-link>
      <HeaderMenu />
      <div class="localePickerBox">
        <HeaderLocalePicker />
      </div>
    </header>
    <HeaderSearch />
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      mobileMenu: false,
    };
  },
};
</script>

<style lang="stylus" scoped>
.header {
  position: relative;
  display: flex;
  padding-top: 8px;
  align-items: center;

  +mediaTablet() {
    flex-wrap: wrap;
    align-items: center;
    padding-top: 15px;
  }

  +mediaDesktop() {
    padding: 12px 0 0;
  }
}

.logoWrapper {
  display: block;
  transition: 0.3s;
  margin-right: 16px;

  +mediaDesktop() {
    margin-right: 40px;
  }
}

.localePickerBox {
  margin-left: auto;
  transition: 0.3s;

  +mediaTablet() {
  }
}
</style>
