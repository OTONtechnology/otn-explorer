<template>
  <CommonContentBlockWrapper>
    <template #title>
      {{ $t("Address") }}
    </template>
    <LayoutAddress
      :infoTitles="addressInfoTitles"
      :tableTitles="addressTableTitles"
      :rows="addressGroupByDay"
      :headRows="addressHeadRows"
    />
    <CommonButtonMore class="table__button" />
  </CommonContentBlockWrapper>
</template>

<script>
import addressGroupByDay from "@/mixins/addressGroupByDay";
export default {
  name: "AddressPage",
  mixins: [addressGroupByDay],
  layout: "base",
  data() {
    return {
      addressInfoTitles: [
        { name: "totalReceived", text: "Total Received" },
        { name: "totalSent", text: "Total Sent" },
        { name: "balances", text: "Balances" },
      ],
      addressTableTitles: [
        { name: "date", text: "Date" },
        { name: "time, UTC", text: "Time, UTC" },
        { name: "hash", text: "Hash" },
        { name: "type", text: "Type" },
        { senderRecipient: "from", text: "Sender/Recipient" },
        { name: "sum", text: "Sum" },
      ],
      addressHeadRows: [
        { received: 44152, sent: 52, currName: "EBP" },
        { received: 84, sent: 0, currName: "RANK" },
        { received: 1629, sent: 784, currName: "CP" },
        { received: 285, sent: 11, currName: "PCT" },
      ],
      addressRows: [
        {
          timestamp: "1629474423",
          hash: "0x40160a8130ff838e5659d48b58b6c17651011f05",
          type: "Distribution",
          senderRecipient: ["0x440a814533056ff838e534838e5659d48b5456"],
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
          timestamp: "1629468603",
          hash: "0x40160a8130ff838e5659d48b58b6c17651011f05",
          type: "Transfer",
          senderRecipient: ["0x440a814533056ff838e534838e5659d48b5456"],
          sum: [
            {
              name: "EBP",
              amount: 241,
            },
          ],
        },
        {
          timestamp: "1629379680",
          hash: "0x40160a8130ff838e5659d48b58b6c17651011f05",
          type: "Transfer",
          senderRecipient: ["0x440a814533056ff838e534838e5659d48b5456"],
          sum: [
            {
              name: "EBP",
              amount: 12,
            },
          ],
        },
        {
          timestamp: "1629376868",
          hash: "0x40160a8130ff838e5659d48b58b6c17651011f05",
          type: "Distribution",
          senderRecipient: ["0x440a814533056ff838e534838e5659d48b5456"],
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
};
</script>

<style lang="stylus" scoped></style>
