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
import dayjs from "dayjs";
import { groupBy, prop, reverse } from "rambda";
import getArrayFromObjectArray from "@/utils/getArrayFromObjectArray";

export default {
  name: "HomePage",
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
          from: "0x56440a8145330ff838e56",
          to: "0x34673454358130ff838e71",
          sum: 645334,
        },
        {
          id: "2",
          timestamp: "1629468603",
          hash: "0x5647830ff838e5659d48b58b636617651011f00",
          type: "Transfer",
          from: "0x440a814533056ff838e56",
          to: "0x67343454358130ff838e71",
          sum: 64334,
        },
        {
          id: "3",
          timestamp: "1629379680",
          hash: "0x40160a8130ff838e5659d48b58b6c17651011f05",
          type: "Distribution",
          from: "0x440a814533056ff838e56",
          to: 235,
          sum: 445,
        },
        {
          id: "4",
          timestamp: "1629376868",
          hash: "0x5647830ff838e5659d48b58b636617651011f00",
          type: "Distribution",
          from: "0x440a814533056ff838e56",
          to: 232,
          sum: 45,
        },
      ],
      format: {
        day: "YYYY-MM-DD",
        time: "HH:mm",
      },
    };
  },
  computed: {
    rowsGroupByDay() {
      const mappedRows = this.transactionRows.map(({ ...row }) => ({
        ...row,

        id: row.id,
        date: row.timestamp * 1000,
        hash: row.hash,
        type: row.type,
        from: row.from,
        to: row.to,
        sum: row.sum,
        dateDay: String(
          dayjs(
            dayjs.unix(row.timestamp).format(this.format.day),
            this.format.day
          ).unix()
        ),
        time: dayjs.unix(row.timestamp).format(this.format.time),
      }));
      const rowsObjGroupByDay = groupBy(prop("dateDay"), mappedRows);
      const rowsArrayGroupByDay = getArrayFromObjectArray(rowsObjGroupByDay);

      return reverse(rowsArrayGroupByDay);
    },
  },
};
</script>

<style lang="stylus" scoped></style>
