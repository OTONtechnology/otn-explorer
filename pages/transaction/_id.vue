<template>
  <CommonContentBlockWrapper>
    <template #title>
      {{ $t("Transaction") }}
    </template>
    <WithLoader :state="fetchState">
      <LayoutTransaction :titles="transactionTitles" :row="transactionRow" />
    </WithLoader>
  </CommonContentBlockWrapper>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: 'TransactionPage',
  layout: 'base',
  data() {
    return {
      transactionTitles: [
        { name: 'date', text: 'Date and Time, UTC' },
        { name: 'type', text: 'Type' },
        { name: 'sum', text: 'Sum' },
      ],

    };
  },

  computed: {
    ...mapState({
      fetchState: state => state.transactionByHash.fetchState
    }),
    ...mapGetters({
      transactionRow: 'transactionByHash/transaction'
    }),
  },

  mounted() {
    this.fetch(this.$route.params.id);
  },

  methods: {
    ...mapActions({
      fetch: 'transactionByHash/fetchByHash'
    })
  },
}
</script>

<style lang="stylus" scoped></style>
