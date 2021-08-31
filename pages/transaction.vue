<template>
  <CommonContentBlockWrapper>
    <template #title>
      {{ $t("Transaction") }}
    </template>
    <LayoutTransaction :titles="transactionTitles" :row="transactionRow" />
  </CommonContentBlockWrapper>
</template>

<script>
export default {
  name: 'TransactionPage',
  layout: "base",
  data() {
    return {
      transactionTitles: [
        { name: "date", text: "Date and Time, UTC" },
        { name: "type", text: "Type" },
        { name: "addresses", text: "Addresses" },
        { name: "sum", text: "Sum" },
      ],
      transactionRow: {
        id: "1",
        date: "12 sep",
        time: "15:52",
        // date: '1629474423',
        hash: "0x40160a8130ff838e5659d48b58b6c17651011f05",
        type: "Distribution",
        from: "0x56440a8145330ff838e56",
        to: [
          "0x56440a8145330ff838e56",
          "0x56440a8145330ff838e56",
          "0x56440a8145330ff838e56",
          "0x56440a8145330ff838e56",
          "0x56440a8145330ff838e56",
        ],
        sum: 645334,
      },
      // transactionRow: {
      //   id: "1",
      //   date: "12 sep",
      //   time: "15:52",
      //   // date: '1629474423',
      //   hash: "0x40160a8130ff838e5659d48b58b6c17651011f05",
      //   type: "Transfer",
      //   from: "0x56440a8145330ff838e56",
      //   to: "0x34673454358130ff838e71",
      //   sum: 645334,
      // },
    };
  },
}
</script>

<style lang="stylus" scoped>
</style>
