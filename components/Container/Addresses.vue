<template>
  <LayoutTable :titles="addressesTitles" :rows="addressesRows" />
</template>

<script>
export default {
  name: "ContainerAddresses",
  components: {},
  props: {},
  data() {
    return {
      addressesTitles: [
        { name: "address", text: "Address" },
        { name: "totalReceived", text: "Total Received" },
        { name: "totalSent", text: "Total Sent" },
        { name: "balance", text: "Balance" },
      ],
      addressesRows: [
        {
          address: "0x40160a8130ff838e5659d48b58b6c17651011f05",
          totalReceived: 2154,
          totalSent: 6,
          balance: 241,
        },
        {
          address: "0x5647830ff838e5659d48b58b636617651011f00",
          totalReceived: 2,
          totalSent: 0,
          balance: 54,
        },
      ],
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="stylus" scoped></style>
