<template>
  <CommonContentBlockWrapper>
    <template #title>
      {{ $t("Latest Transactions") }}
    </template>
    <TransactionsTable
      :titles="transactionTitles"
      :rows="transactionsGroupByDay"
    />
    <CommonButton href="/transactions" :button="false" />
  </CommonContentBlockWrapper>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import transactionsGroupByDay from '@/mixins/transactionsGroupByDay';

export default {
  name: 'HomePage',
  mixins: [transactionsGroupByDay],
  layout: 'base',
  data() {
    return {
      transactionTitles: [
        { name: 'date', text: 'Date' },
        { name: 'time, UTC', text: 'Time, UTC' },
        { name: 'hash', text: 'Hash' },
        { name: 'type', text: 'Type' },
        { name: 'from', text: '' },
        { name: 'arrow', text: '' },
        { name: 'to', text: '' },
        { name: 'sum', text: 'Sum' },
      ],

    };
  },

  computed: {
    ...mapState({
      fetchState: state => state.lastTransactions.fetchState
    }),
    ...mapGetters({
      transactionRows: 'lastTransactions/transactionsRows'
    }),
  },

  mounted() {
    this.fetch();
  },

  methods: {
    ...mapActions({
      fetch: 'lastTransactions/fetch'
    })
  },

};
</script>

<style lang="stylus" scoped></style>
