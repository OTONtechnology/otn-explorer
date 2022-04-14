<template>
  <nav class="layoutHeaderMenu">
    <nuxt-link
      v-for="link in menuLinks"
      :key="link.text"
      :to="localePath(link.href)"
      class="layoutHeaderMenu__link"
    >
      {{ $t(link.text) }}
    </nuxt-link>
  </nav>
</template>

<script>
export default {
  name: 'HeaderMenu',
  data() {
    return {
      menuLinks: [
        {
          href: '/transactions',
          text: 'Transactions',
        },
        {
          href: '/live-map',
          text: 'Nodes live map',
        },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.layoutHeaderMenu {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 5px;

  +mediaTablet() {
    grid-column-gap: 19px;
  }

  &__link {
    font-size: 9px;
    font-weight: bold;
    text-transform: uppercase;
    color: $colorFontBase;
    transition: all 0.1s;

    +mediaTablet() {
      getFontSubtitle();
    }

    &:hover {
      opacity: 0.8;
    }

    &.nuxt-link-active {
      color: $colorDanger;
    }
  }
}
</style>
