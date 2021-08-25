<template>
  <div class="tableButtonBox">
    <nuxt-link
      v-if="isHomePage"
      :to="localePath('/transactions')"
      class="tableButton"
    >
      {{ $t("All Transactions") }}
    </nuxt-link>
    <button v-else type="button" class="tableButton">
      {{ $t("More") }}
    </button>
  </div>
</template>

<script>
import homePage from '@/utils/homePage';

export default {
  name: 'TableButton',
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    isHomePage() {
      if (homePage.includes(this.$route.path)) {
        return true;
      }
      return false;
    },
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
.tableButton {
  display: inline-block;
  padding: 7px 12px;
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
