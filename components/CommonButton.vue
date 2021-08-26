<template>
  <div class="tableButtonBox">
    <button v-if="button" type="button" class="tableButton">
      <slot v-if="$slots.icon" name="icon" />
      <slot>{{ $t("More") }}</slot>
    </button>
    <nuxt-link
      v-else
      :to="localePath(href)"
      class="tableButton"
    >
      <slot>{{ $t("All Transactions") }}</slot>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'CommonButton',
  props: {
    button: {
      type: Boolean,
      default: true
    },
    href: {
      type: String,
      default: "/",
      required: false
    }
  }
}
</script>

<style lang="stylus" scoped>

.tableButton {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 5px
  align-items: center;
  padding: 7px 12px;
  width fit-content
  border-radius: 4px;
  background-color: $colorFontBase;
  getFont('transactionButton');
  font-weight: 700;
  color: $colorFiller;

  &:hover {
    opacity: 0.8;
  }
}
</style>
