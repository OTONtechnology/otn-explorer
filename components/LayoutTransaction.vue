<template>
  <div class="transactionTable">
    <CopyHash :hash="row.hash" />
    <div class="transactionTableInfo">
      <TableHead
        class="transactionTableInfo__head transactionTableInfo__box"
        :titles="titles"
        :lastCellMR="true"
      />
      <div class="transactionTableInfo__box">
        <span class="transactionTable__cell">
          {{ row.date }}, {{ row.time }}
        </span>
        <span class="transactionTable__cell">
          {{ $t(row.type) }}
        </span>
        <div class="transactionTable__cell transactionTable__cellSum">
          <div class="transactionTable__cellSumInner">
            <span>245</span>
            <span>EBP</span>
          </div>
        </div>
      </div>
    </div>
    <div class="transactionTableBody">
      <div class="transactionTableBody__box transactionTableBody__box_sender">
        <span class="transactionTableBody__title">
          {{ $t("Sender") }}
        </span>
        <span
          class="transactionTableBody__title transactionTableBody__title_sum"
        >
          {{ $t("Sum") }}
        </span>
        <template v-for="sender in row.senders">
          <nuxt-link
            :key="sender.address"
            class="transactionTableBody__link"
            :to="localePath('/address')"
          >
            {{ sender.address }}
          </nuxt-link>
          <div
            :key="sender.address + sender.currName"
            class="transactionTable__cell transactionTable__cellSum"
          >
            <div
              class="transactionTableBody__text transactionTable__cellSumInner"
            >
              <span>{{ sender.currAmount }}</span>
              <span>{{ sender.currName }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="transactionTableBody">
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
        <template v-for="recipient in row.recipients">
          <nuxt-link
            :key="recipient.address"
            class="transactionTableBody__link"
            :to="localePath('/address')"
          >
            {{ recipient.address }}
          </nuxt-link>
          <div
            :key="recipient.address + recipient.currName"
            class="transactionTable__cell transactionTable__cellSum"
          >
            <div
              class="transactionTableBody__text transactionTable__cellSumInner"
            >
              <span>{{ recipient.currAmount }}</span>
              <span>{{ recipient.currName }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutTransaction",
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
        day: "YYYY-MM-DD",
        time: "HH:mm",
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
    grid-template-columns: 155px 80px 78px;
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
      width: calc(100% - 44px);
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span:last-of-type {
      display: inline-block;
      margin-left: 4px;
      width: 40px;
      opacity: 0.4;
      text-transform: uppercase;
      text-align: left;
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
    grid-template-columns: 265px 78px;

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
      margin-right: 44px;
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
