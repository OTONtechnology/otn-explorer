<template>
  <div class="transactionTable">
    <CopyHash :hash="row.id" />
    <div class="transactionTableInfo">
      <TableHead
        class="transactionTableInfo__head transactionTableInfo__box"
        :titles="titles"
      />
      <div class="transactionTableInfo__box">
        <span class="transactionTable__cell">
          {{ $d(row.block.timestamp * 1000, "transactionDate") }}
        </span>
        <span class="transactionTable__cell">
          {{ $t(row.type) }}
        </span>
        <div class="transactionTable__cell transactionTableInfo__cellSum">
          <div
            v-for="total in row.totals"
            :key="total[0]"
            class="transactionTableInfo__cellSumInner"
          >
            <span>{{ total[1] }}</span>
            <span :title="total[0].toUpperCase()">{{ total[0] }}</span>
            <span v-if="total[0] === row.fee.ticker">
              {{ $t("Included {fee} fee", { fee: row.fee.amount }) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="row.inputs.length > 0" class="transactionTableBody">
      <div class="transactionTableBody__box transactionTableBody__box_sender">
        <span class="transactionTableBody__title">
          <template v-if="row.inputs.length > 1">{{ $t("Senders") }}</template>
          <template v-else>{{ $t("Sender") }}</template>
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
              <span :title="input.ticker.toUpperCase()">
                {{ input.ticker }}
              </span>
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
          <template v-if="row.outputs.length > 1">{{
            $t("Recipients")
          }}</template>
          <template v-else>{{ $t("Recipient") }}</template>
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
              <span :title="output.ticker.toUpperCase()">
                {{ output.ticker }}
              </span>
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
    grid-gap: 4px;
    grid-template-columns: 105px 75px minmax(65px, max-content);

    +mediaTablet() {
      grid-gap: 4px 30px;
      grid-template-columns: 155px 126px minmax(65px, max-content);
    }
  }

  &__cellSum {
    text-align: right;
    font-weight: 700;
  }

  &__cellSumInner {
    display: grid;
    grid-template-columns: min-content auto;
    grid-gap: 2px 4px;
    margin-bottom: 4px;
    overflow: hidden;

    +mediaTablet() {
      display: flex;
      max-height: 18px;
    }

    span {
      &:first-of-type {
        display: inline-block;
        overflow: hidden;
        grid-column: 1 / 2;

        +mediaTablet() {
          grid-column-start: unset;
          grid-column-end: unset;
        }
      }

      &:nth-of-type(2) {
        grid-column: 2 / 3;
        position: relative;
        display: inline-block;
        opacity: 0.4;
        text-transform: uppercase;
        text-align: left;
        overflow: hidden;

        +mediaTablet() {
          width: 50px;
          grid-column-start: unset;
          grid-column-end: unset;
        }

        &::after {
          position: absolute;
          z-index: 2;
          top: 0;
          right: 0;
          content: '';
          display: block;
          width: 12px;
          height: 100%;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
        }
      }

      &:last-of-type {
        grid-column: 1 / 3;
        text-align: right;

        +mediaTablet() {
          grid-column-start: unset;
          grid-column-end: unset;
        }
      }
    }
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
    display: grid;
    grid-template-columns: minmax(46%, max-content) auto;

    +mediaDesktop() {
      display: flex;
      justify-content: flex-end;
    }

    span:first-of-type {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;

      +mediaDesktop() {
        max-width: unset;
      }
    }

    span:last-of-type {
      position: relative;
      display: inline-block;
      margin-left: 4px;
      opacity: 0.4;
      text-transform: uppercase;
      text-align: left;
      overflow: hidden;
      min-width: 30px;

      &::after {
        position: absolute;
        z-index: 2;
        top: 0;
        right: 0;
        content: '';
        display: block;
        width: 12px;
        height: 100%;
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
      }

      +mediaDesktop() {
        max-width: unset;

        &::after {
          display: none;
        }
      }
    }
  }
}

.transactionTableBody {
  &:not(:last-child) {
    margin-bottom: 12px;
  }

  &__box {
    display: grid;
    grid-gap: 4px 8px;
    grid-template-columns: calc(100% - 98px) 90px;

    +mediaTablet() {
      grid-gap: 4px 30px;
      grid-template-columns: 312px minmax(65px, max-content);
    }

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
      +mediaDesktop() {
        text-align: left;
        margin-right: 0;
      }
    }
  }

  &__link {
    position: relative;
    display: block;
    overflow: hidden;
    color: $colorLink;

    &::after {
      position: absolute;
      z-index: 2;
      top: 0;
      right: 0;
      content: '';
      display: block;
      width: 12px;
      height: 100%;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
    }

    +mediaTablet() {
      width: fit-content;

      &::after {
        display: none;
      }
    }

    &:hover {
      color: $colorDanger;
    }
  }
}
</style>
