<template>
  <div class="transactionTable">
    <CopyHash :hash="row.id" />
    <div class="transactionTableInfo">
      <TableHead
        class="transactionTableInfo__head transactionTableInfo__box"
        :titles="titles"
        :lastCellMR="true"
      />
      <div class="transactionTableInfo__box">
        <span class="transactionTable__cell">
          {{ $d(row.block.timestamp * 1000, "transactionDate") }}
        </span>
        <span class="transactionTable__cell">
          {{ $t(row.type) }}
        </span>
        <div class="transactionTable__cell transactionTable__cellSum">
          <div
            v-for="total in row.totals"
            :key="total[0]"
            class="transactionTable__cellSumInner"
          >
            <span>{{ total[1] }}</span>
            <span :title="total[0].toUpperCase()">{{ total[0] }}</span>
            <span v-if="total[0] === row.fee.ticker">
              (includes fee {{ row.fee.amount }} {{ row.fee.ticker }})
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="row.inputs.length > 0" class="transactionTableBody">
      <div class="transactionTableBody__box transactionTableBody__box_sender">
        <span class="transactionTableBody__title">
          {{ $t("Sender") }}
        </span>
        <span
          class="transactionTableBody__title transactionTableBody__title_sum"
        >
          {{ $t("Sum") }}
        </span>
        <template v-for="input in row.inputs">
          <nuxt-link
            :key="input.address + 'address'"
            class="transactionTableBody__link"
            :to="localePath(`/address/${input.address}`)"
          >
            {{ input.address }}
          </nuxt-link>
          <div
            :key="input.address + 'sum'"
            class="transactionTable__cell transactionTable__cellSum"
          >
            <div
              class="transactionTableBody__text transactionTable__cellSumInner"
            >
              <span>{{ input.amount }}</span>
              <span :title="input.ticker.toUpperCase()">{{
                input.ticker
              }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-if="row.outputs.length > 0" class="transactionTableBody">
      <div
        class="transactionTableBody__box transactionTableBody__box_recipient"
      >
        <span class="transactionTableBody__title">
          {{ $t("Recipients") }}
        </span>
        <span
          class="transactionTableBody__title transactionTableBody__title_sum"
        >
          {{ $t("Sum") }}
        </span>
        <template v-for="output in row.outputs">
          <nuxt-link
            :key="output.address + 'address'"
            class="transactionTableBody__link"
            :to="localePath(`/address/${output.address}`)"
          >
            {{ output.address }}
          </nuxt-link>
          <div
            :key="output.address + 'sum'"
            class="transactionTable__cell transactionTable__cellSum"
          >
            <div
              class="transactionTableBody__text transactionTable__cellSumInner"
            >
              <span>{{ output.amount }}</span>
              <span :title="output.ticker.toUpperCase()">{{
                output.ticker
              }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LayoutTransaction',
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
      format: {
        day: 'YYYY-MM-DD',
        time: 'HH:mm',
      },
    };
  },
};
</script>

<style lang="stylus" scoped>
.transactionTableInfo {
  margin-bottom: 12px;

  &__head {
    margin-bottom: 4px;
  }

  &__box {
    display: grid;
    grid-gap: 4px 30px;
    // grid-template-columns: 155px 80px 78px;
    grid-template-columns: 155px 80px 120px;
  }
}

.transactionTable {
  getFont();
  color: $colorFontBase;

  &__cellSum {
    text-align: right;
    font-weight: 700;
  }

  &__cellSumInner {
    margin-bottom: 4px;
    max-height: 18px;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;

    span:first-of-type {
      display: inline-block;
      // width: calc(100% - 44px);
      width: calc(100% - 65px);
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span:last-of-type {
      display: inline-block;
      margin-left: 4px;
      // width: 40px;
      width: 60px;
      opacity: 0.4;
      text-transform: uppercase;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.transactionTableBody {
  &:not(:last-child) {
    margin-bottom: 12px;
  }

  &__box {
    display: grid;
    grid-gap: 4px 30px;
    // grid-template-columns: 265px 78px;
    grid-template-columns: 310px 120px;

    &_sender {
      .transactionTable__cellSumInner {
        span:first-of-type {
          color: $colorDanger;
        }
      }
    }

    &_recipient {
      .transactionTable__cellSumInner {
        span:first-of-type {
          color: $colorSuccess;
        }
      }
    }
  }

  &__title {
    opacity: 0.4;

    &_sum {
      text-align: right;
      // margin-right: 45px;
      margin-right: 65px;
    }
  }

  &__link {
    width: fit-content;
    color: $colorLink;

    &:hover {
      color: $colorDanger;
    }
  }
}
</style>
