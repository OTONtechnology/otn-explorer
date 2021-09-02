<template>
  <CommonContentBlockWrapper>
    <template #title>
      {{ $t("Latest Transactions") }}
    </template>
    <TransactionsTable :titles="transactionTitles" :rows="rowsGroupByDay" />
    <CommonButton href="/transactions" :button="false" />
  </CommonContentBlockWrapper>
</template>

<script>
import { mapActions } from 'vuex';
import rowsGroupByDay from "@/mixins/rowsGroupByDay";

export default {
  name: "HomePage",
  mixins: [rowsGroupByDay],
  layout: "base",
  data() {
    return {
      transactionTitles: [
        { name: "date", text: "Date" },
        { name: "time, UTC", text: "Time, UTC" },
        { name: "hash", text: "Hash" },
        { name: "type", text: "Type" },
        { name: "from", text: "" },
        { name: "arrow", text: "" },
        { name: "to", text: "" },
        { name: "sum", text: "Sum" },
      ],
      transactionRows: [
        {
          id: "1",
          timestamp: "1629474423",
          hash: "0x40160a8130ff838e5659d48b58b6c17651011f05",
          type: "Transfer",
          from: ["0x56440a8145330ff838e56"],
          to: ["0x34673454358130ff838e71"],
          sum: [
            {
              name: "EBP",
              amount: 12,
            },
          ],
        },
        {
          id: "2",
          timestamp: "1629468603",
          hash: "0x5647830ff838e5659d48b58b636617651011f00",
          type: "Transfer",
          from: ["0x440a814533056ff838e56"],
          to: ["0x67343454358130ff838e71"],
          sum: [
            {
              name: "EBP",
              amount: 241,
            },
            {
              name: "RANK",
              amount: 2,
            },
          ],
        },
        {
          id: "3",
          timestamp: "1629379680",
          hash: "0x40160a8130ff838e5659d48b58b6c17651011f05",
          type: "Distribution",
          from: ["0x440a814533056ff838e56", "0x67343454358130ff838e71"],
          to: [
            "0x67343454358130ff838e71",
            "0x67343454358130ff838e71",
            "0x67343454358130ff838e71",
            "0x67343454358130ff838e71",
            "0x67343454358130ff838e71",
          ],
          sum: [
            {
              name: "EBP",
              amount: 241,
            },
          ],
        },
        {
          id: "4",
          timestamp: "1629376868",
          hash: "0x5647830ff838e5659d48b58b636617651011f00",
          type: "Distribution",
          from: [
            "0x440a814533056ff838e56",
            "0x67343454358130ff838e71",
            "0x67343454358130ff838e71",
            "0x67343454358130ff838e71",
            "0x67343454358130ff838e71",
            "0x67343454358130ff838e71",
          ],
          to: ["0x67343454358130ff838e71", "0x67343454358130ff838e71"],
          sum: [
            {
              name: "EBP",
              amount: 241,
            },
            {
              name: "RANK",
              amount: 2,
            },
            {
              name: "CP",
              amount: 2,
            },
          ],
        },
      ],
    };
  },

  mounted() {
    this.fetch('a3e747a82a7d3cafa48fd643168c2b2c6c83b018');
  },

  methods: {
    ...mapActions({
      fetch: 'transactionsByAddress/fetchByAddress'
    })
  },

};
</script>

<style lang="stylus" scoped></style>
