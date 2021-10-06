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
    <CommonButtonMore v-if="btnMoreOn" @click="fetch" />
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
    };
  },

  computed: {
    ...mapState({
      fetchState: state => state.lastTransactions.fetchState
    }),
    ...mapGetters({
      transactionRows: 'lastTransactions/transactionsRows'
    }),
    btnMoreOn() {
      if (this.transactionRows && this.transactionRows.length % 25 === 0) {
        return true
      }
      return false
    }
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
