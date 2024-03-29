<template>
  <CommonContentBlockWrapper>
    <template #title>
      {{ $t("Address") }}
    </template>
    <WithLoader :state="balanceState">
      <WithLoader :state="transactionsState" :loadMore="true">
        <div>
          <LayoutAddress
            :infoTitles="addressInfoTitles"
            :tableTitles="addressTableTitles"
            :rows="addressGroupByDay"
            :headRows="addressHeadRows"
          />
        </div>
      </WithLoader>
    </WithLoader>
    <CommonButtonMore
      v-if="btnMore"
      class="table__button"
      @click="fetchTransactions($route.params.id)"
    />
  </CommonContentBlockWrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { prop, propEq } from 'rambda';
import addressGroupByDay from '@/mixins/addressGroupByDay';
import { FULFILLED, PENDING } from '~/utils/constants';

export default {
  name: 'AddressPage',
  mixins: [addressGroupByDay],
  layout: 'base',

  computed: {
    ...mapState({
      balanceState: state => state.addressBalance.fetchState,
      transactionsState: state => state.addressTransactions.fetchState,

      balanceData: state => state.addressBalance.balance,
      transactionsData: state => state.addressTransactions.transactions,
      btnMore: state => state.addressTransactions.btnMore,
    }),
    addressInfoTitles() {
      const result = [];

      const hasReceived = this.addressHeadRows.some(({ received }) => typeof received !== 'undefined');
      const hasSent = this.addressHeadRows.some(({ sent }) => typeof sent !== 'undefined');

      if (hasReceived) {
        result.push({ name: 'totalReceived', text: 'Total Received' });
      }
      if (hasSent) {
        result.push({ name: 'totalSent', text: 'Total Sent' },);
      }

      return [
        ...result,
        { name: 'balances', text: 'Balances' },
      ]
    },
    addressHeadRows() {
      if ((this.transactionsState !== PENDING && this.transactionsState !== FULFILLED) || this.balanceState !== FULFILLED) {
        return [];
      }

      const currencies = {};

      (this.transactionsData || []).forEach(trn => {
        currencies.id = trn.id;
      });

      const balances = Object.keys(this.balanceData || {});

      return balances.map(key => ({
        received: this.balanceData[key].received,
        sent: this.balanceData[key].spent,
        currName: key,
        balance: this.balanceData[key].balance
      }));
    },
    addressTableTitles: () => ([
      { name: 'date', text: 'Date' },
      { name: 'time', text: 'Time' },
      { name: 'hash', text: 'Hash' },
      { name: 'type', text: 'Type' },
      { senderRecipient: 'from', text: 'Sender/Recipient' },
      { name: 'sum', text: 'Sum' },
    ]),
    addressRows() {
      const currentAddress = this.$route.params.id.toLowerCase();

      return [
        ...this.transactionsData.map(trn => {
          const isSender = trn.inputs.some(input => input.address === currentAddress);

          const sumData = isSender ? trn.inputs : trn.outputs;

          return {
            isSender,
            timestamp: trn.block.timestamp,
            hash: trn.id,
            type: trn.type,
            senderRecipient: sumData.map(prop('address')),
            sum: sumData.filter(propEq('address', currentAddress)).map(d => ({
              name: d.ticker,
              amount: d.amount,
            })),

          }
        })
      ];
    },
  },
  mounted() {
    const address = this.$route.params.id;
    this.fetchBalance(address);
    this.fetchTransactions(address);
  },

  destroyed() {
    this.$store.commit('addressBalance/CLEAR')
    this.$store.commit('addressTransactions/CLEAR')
  },

  methods: {
    ...mapActions({
      fetchBalance: 'addressBalance/fetch',
      fetchTransactions: 'addressTransactions/fetch'
    })
  },
};
</script>

<style lang="stylus" scoped></style>
