<template>
  <CommonContentBlockWrapper>
    <template #title>
      {{ $t("Transactions") }}
    </template>

    <WithLoader :state="fetchState" :loadMore="true">
      <div>
        <TransactionsTable
          :titles="transactionTitles"
          :rows="transactionsGroupByDay"
        />
      </div>
    </WithLoader>
    <CommonButtonMore
      v-show="transactionRows && transactionRows.length"
      @click="fetch"
    />
  </CommonContentBlockWrapper>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import transactionsGroupByDay from '@/mixins/transactionsGroupByDay';

export default {
  name: 'TransactionsPage',
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
      // limitTransactions: 25,
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
    }),
  },
};
</script>

<style lang="stylus" scoped></style>
