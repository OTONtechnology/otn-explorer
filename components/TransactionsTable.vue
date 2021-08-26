<template>
  <div class="table">
    <TableHead
      class="table__box table__box_transactions"
      :titles="titles"
    />
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
