<template>
  <div class="table">
    <CopyHash :hash="row.hash" />
    <TableHead
      class="transactionTableHead table__box"
      :titles="modifiedTitles"
    />
    <div class="table__box">
      <span class="table__cell"> {{ row.date }}, {{ row.time }} </span>
      <span class="table__cell">
        {{ $t(row.type) }}
      </span>
      <span v-if="row.type === 'Distribution'" class="table__cell">
        {{ row.to.length }}
      </span>
      <span class="table__cell table__cell_sum">
        {{ row.sum }}
      </span>
    </div>
    <template v-if="row.type === 'Transfer'">
      <div v-for="box in boxes" :key="box.title" class="transactionTableBox">
        <span class="transactionTableBox__title">
          {{ $t(box.title) }}
        </span>
        <span class="transactionTableBox__text">
          {{ box.text }}
        </span>
      </div>
    </template>
    <template v-else-if="row.type === 'Distribution'">
      <div class="transactionTableBox">
        <span class="transactionTableBox__title">
          {{ $t("Transaction Initiator") }}
        </span>
        <span class="transactionTableBox__text">
          {{ row.from }}
        </span>
      </div>
    </template>
    <TransactionDistributionList
      v-if="row.type === 'Distribution'"
      :rows="row.to"
    />
    <TableButton v-if="row.type === 'Distribution'" />
  </div>
</template>

<script>
export default {
  name: "LayoutTransaction",
  components: {},
  props: {
    titles: {
      type: Array,
      required: true,
    },
    row: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      boxes: [
        {
          title: "Sender",
          text: this.row.from,
        },
        {
          title: "Recipient",
          text: this.row.to,
        },
      ],
    };
  },
  computed: {
    modifiedTitles() {
      const newTitles = [...this.titles];
      if (this.row.type === "Transfer") {
        newTitles.splice(2, 1);
        return newTitles;
      }
      return newTitles;
    },
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
.transactionTableHead {
  margin-bottom: -8px;
}

.transactionTableBox {
  margin-top: 12px;
  getFont();

  &__title {
    display: block;
    margin-bottom: 4px;
    opacity: 0.4;
  }

  &__text {
    color: $colorLink;

    &:hover {
      color: $colorDanger;
    }
  }
}

.table {
  getFont();
  color: $colorFontBase;

  &__box {
    display: grid;
    grid-column-gap: 30px;
    grid-template-columns: 155px 80px 78px 68px;
    align-items: center;
    padding: 6px 0;
  }

  &__cell {
    &_sum {
      font-weight: 700;
    }
  }
}
</style>
