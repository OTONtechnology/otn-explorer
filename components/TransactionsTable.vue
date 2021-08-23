<template>
  <div class="transactionsTable">
    <TransactionsTableHead class="transactionsTable__box" />
    <TransactionsTableItem class="transactionsTable__box" />
    <TransactionsTableButton />
  </div>
</template>

<script>
export default {
  name: 'TransactionsTable',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="stylus" scoped>
.transactionsTable {
  &__box {
    display: grid;
    grid-template-columns: 58px 75px 335px 93px 180px 27px 180px 82px;
    grid-column-gap: 10px;

    &:not(:last-of-type) {
      margin-bottom: 12px;
    }
  }
}
</style>
