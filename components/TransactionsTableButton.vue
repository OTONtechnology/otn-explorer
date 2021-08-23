<template>
  <div class="transactionsTableButtonBox">
    <nuxt-link
      v-if="isHomePage"
      :to="localePath('/transactions')"
      class="transactionsTableButton"
    >
      {{ $t("All Transactions") }}
    </nuxt-link>
    <button v-else type="button" class="transactionsTableButton">
      {{ $t("More") }}
    </button>
  </div>
</template>

<script>
import homePage from '@/utils/homePage.js'

export default {
  name: 'TransactionsTableButton',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    isHomePage () {
      if (homePage.includes(this.$route.path)) {
        return true
      }
      return false
    }
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
.transactionsTableButton {
  display inline-block
  padding: 7px 12px;
  border-radius: 4px;
  background-color: $colorFontBase;
  getFont('transactionButton');
  font-weight: 700;
  color: $colorFiller;
}
</style>
