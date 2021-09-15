<template>
  <CommonContentBlockWrapper>
    <template #title>
      {{ $t("Transactions") }}
    </template>

    <WithLoader :state="fetchState">
      <div>
        <TransactionsTable
          :titles="transactionTitles"
          :rows="transactionsGroupByDay"
        />
        <CommonButtonMore class="table__button" />
      </div>
    </WithLoader>
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
