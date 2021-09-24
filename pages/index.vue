<template>
  <CommonContentBlockWrapper>
    <template #title>
      {{ $t("Latest Transactions") }}
    </template>
    <WithLoader :state="fetchState">
      <div>
        <TransactionsTable
          :titles="transactionTitles"
          :rows="transactionsGroupByDay"
        />
        <CommonButton v-if="false" href="/transactions" :button="false" />
      </div>
    </WithLoader>
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
        { name: 'time', text: 'Time' },
        { name: 'hash', text: 'Hash' },
        { name: 'type', text: 'Type' },
        { name: 'addresses', text: '' },
        { name: 'total', text: 'Total' },
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

  destroyed() {
    this.$store.commit('lastTransactions/CLEAR')
  },

  methods: {
    ...mapActions({
      fetch: 'lastTransactions/fetch'
    })
  },

};
</script>

<style lang="stylus" scoped></style>
