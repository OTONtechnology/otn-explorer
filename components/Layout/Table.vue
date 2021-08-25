<template>
  <div class="table">
    <TableHead
      class="table__box"
      :class="
        page === 'addresses' ? `table__box_${page}` : 'table__box_transactions'
      "
      :titles="titles"
    />
    <template v-if="page === 'addresses'">
      <AddressesTableItem
        v-for="row in rows"
        :key="row.id"
        :row="row"
        class="table__box table__box_addresses"
      />
    </template>
    <template v-else>
      <div
        v-for="day in rows"
        :key="day[0].dateDay"
        class="transactionsTable__bodyDay"
      >
        <TransactionsTableItem
          v-for="row in day"
          :key="row.id"
          :row="row"
          class="table__box table__box_transactions"
        />
      </div>
    </template>
    <TableButton class="table__button" />
  </div>
</template>

<script>
export default {
  name: "LayoutTable",
  components: {},
  props: {
    titles: {
      type: Array,
      required: true,
    },
    rows: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    page() {
      const pathArr = this.$route.path.split("/");
      return pathArr[pathArr.length - 1];
    },
    // viewComponent() {
    //   const viewToComponents = {
    //     addresses: AddressTableItem,
    //     transactions: TransactionsTableItem,
    //   };
    //   return viewToComponents[this.page];
    // },
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
.table {
  getFont();
  color: $colorFontBase;

  &__box {
    display: grid;
    grid-column-gap: 10px;
    align-items: center;
    padding: 6px 0;

    &_transactions {
      transactionsGrid();
    }

    &_addresses {
      addressGrid();
    }
  }

  &__button {
    margin-top: 14px;
  }
}
</style>
