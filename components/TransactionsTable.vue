<template>
  <div class="table">
    <TableHead
      v-show="rows && rows.length"
      class="table__box table__box_head table__box_transactionsHead"
      :titles="titles"
      :lastCellMR="true"
      :lastCellMRTrans="true"
    />
    <div v-for="row in rows" :key="row.hash" class="transactionsTable__bodyDay">
      <TransactionsTableItem
        :row="row"
        class="table__box table__box_transactions table__item"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutTable',
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
    grid-gap: 4px 8px;
    padding: 2px 0;

    +mediaDesktop() {
      padding: 6px 0;
      grid-gap: 4px 10px;
    }

    &_transactions {
      transactionsGrid();
    }

    &_transactionsHead {
      grid-template-columns: 58px 75px 320px 110px 366px 120px;
    }

    &_head {
      display: none;

      +mediaDesktop() {
        display: grid;
      }
    }
  }

  &__item {
    margin-bottom: 12px;

    +mediaDesktop() {
      margin-bottom: 0;
    }
  }

  &__button {
    margin-top: 14px;
  }
}
</style>
