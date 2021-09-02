<template>
  <div class="table">
    <TableHead
      class="table__box table__box_transactions"
      :titles="titles"
      :lastCellMR="true"
    />
    <div v-for="row in rows" :key="row.id" class="transactionsTable__bodyDay">
      <TransactionsTableItem
        :row="row"
        class="table__box table__box_transactions"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutTable",
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
};
</script>

<style lang="stylus" scoped>
.table {
  getFont();
  color: $colorFontBase;

  &__box {
    display: grid;
    grid-column-gap: 10px;
    // align-items: center;
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
