<template>
  <div class="transactionDistributionList">
    <div
      class="transactionDistributionList__box"
    >
      <div
        v-for="head in heads"
        :key="head.name"
        class="transactionDistributionList__headCell"
      >
        {{ $t(head.text) }}
      </div>
    </div>
    <div
      class="transactionDistributionList__item transactionDistributionList__box"
    >
      <span
        class="
          transactionDistributionList__itemCell
          transactionDistributionList__itemCell_count
        "
      >
        1
      </span>
      <span
        class="
          transactionDistributionList__itemCell
          transactionDistributionList__itemCell_hash
        "
      >
        0x66660a8145330ff838e56b58b636617651011f00
      </span>
      <span
        class="
          transactionDistributionList__itemCell
          transactionDistributionList__itemCell_arrow
        "
      >
        <svg-icon
          name="transactions/arrow"
          class="transactionDistributionList__itemIcon"
        />
      </span>
      <span
        class="
          transactionDistributionList__itemCell
          transactionDistributionList__itemCell_hash
        "
      >
        0x56440a81453b58b636617651011f0030ff838e56
      </span>
      <span
        class="
          transactionDistributionList__itemCell
          transactionDistributionList__itemCell_sum
        "
      >
        445
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TransactionDistributionList",
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      heads: [
        { name: "count", text: "" },
        { name: "sender", text: "Sender" },
        { name: "arrow", text: "" },
        { name: "recipient", text: "Recipient" },
        { name: "sum", text: "Sum" },
      ],
    };
  },
};
</script>

<style lang="stylus" scoped>
.transactionDistributionList {
  margin: 16px 0 14px;
  padding-top: 10px;
  border-top: 4px solid $colorBg;
  getFont();

  &__box {
    display: grid;
    grid-template-columns: 24px 315px 9px 315px 70px;
    grid-column-gap: 20px;
    align-items: center;
    padding: 6px 0;
  }

  &__headCell, &__itemCell {
    &:last-of-type {
      text-align: right;
    }
  }

  &__headCell {
    opacity: 0.4;
  }

  &__item {
    &:hover {
      background-color: $colorBg;

      & .transactionDistributionList__itemCell_hash {
        color: $colorLink;

        &::after {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, $colorBg 100%);
        }

        &:hover {
          color: $colorDanger;
        }
      }
    }
  }

  &__itemCell {
    &_count {
      text-align: right;
      opacity: 0.4;
    }

    &_hash {
      max-height: 16px;
      overflow: hidden;
      position: relative;
      z-index: 1;

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

    &_arrow {
    }

    &_sum {
      font-weight: 700;
    }
  }

  &__itemIcon {
    display: block;
    width: 9px;
    height: 9px;
  }
}
</style>
