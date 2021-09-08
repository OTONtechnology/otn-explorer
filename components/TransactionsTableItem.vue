<template>
  <div class="transactionsTableItem">
    <span class="transactionsTableItem__cell transactionsTableItem__cell_date">
      {{ row.showDate ? row.date : "" }}
    </span>
    <span class="transactionsTableItem__cell">
      {{ row.time }}
    </span>
    <span
      class="
        transactionsTableItem__cell
        transactionsTableItem__cell_pseudoEl
        transactionsTableItem__cell_hover
      "
    >
      <nuxt-link
        class="transactionsTableItem__link"
        :to="localePath(`/transaction/${row.hash}`)"
      >
        {{ row.hash }}
      </nuxt-link>
    </span>
    <span class="transactionsTableItem__cell">
      {{ $t(row.type) }}
    </span>
    <span
      class="
        transactionsTableItem__cell
        transactionsTableItem__cell_pseudoEl
        transactionsTableItem__cell_hover
      "
      :class="{
        transactionsTableItem__addresses: row.from.length > 1,
      }"
    >
      <template v-if="row.from.length > 1">
        {{ $tc("address", row.from.length) }}
      </template>
      <template v-else>
        <nuxt-link
          class="transactionsTableItem__link"
          :to="localePath(`/address/${row.from[0]}`)"
        >
          {{ row.from[0] }}
        </nuxt-link>
      </template>
    </span>
    <span class="transactionsTableItem__cell">
      <svg-icon
        name="transactions/arrow"
        class="transactionsTableItem__arrowIcon"
      />
    </span>
    <span
      class="
        transactionsTableItem__cell
        transactionsTableItem__cell_pseudoEl
        transactionsTableItem__cell_hover
      "
      :class="{
        transactionsTableItem__addresses: row.to.length > 1,
      }"
    >
      <template v-if="row.to.length > 1">
        {{ $tc("address", row.to.length) }}
      </template>
      <template v-else>
        <nuxt-link
          v-if="row.to[0]"
          class="transactionsTableItem__link"
          :to="localePath(`/address/${row.to[0]}`)"
        >
          {{ row.to[0] }}
        </nuxt-link>
        <template v-else> n/a </template>
      </template>
    </span>
    <div class="transactionsTableItem__cell transactionsTableItem__sum">
      <div
        v-for="sumItem in row.sum"
        :key="sumItem.name + sumItem.amount"
        class="transactionsTableItem__sumInner"
      >
        <span>{{ sumItem.amount }}</span>
        <span>{{ sumItem.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionsTableItem',
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
.transactionsTableItem {
  position: relative;
  z-index: 3;
  margin-right: -4px;
  margin-left: -4px;
  padding-right: 4px;
  padding-left: 4px;
  border-radius: 2px;

  &:hover {
    background-color: $colorBg;

    .transactionsTableItem__link {
      color: $colorLink;

      &:hover {
        color: $colorDanger;
      }
    }

    .transactionsTableItem__cell_pseudoEl::after {
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, $colorBg 100%);
    }
  }

  &__cell {
    text-overflow: ellipsis;
    overflow: hidden;

    &_pseudoEl {
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
  }

  &__arrowIcon {
    display: block;
    margin-top: 4px;
    width: 9px;
    height: 9px;
  }

  &__addresses {
    text-transform: lowercase;
    opacity: 0.4;
  }

  &__sum {
    text-align: right;
    font-weight: 700;
  }

  &__sumInner {
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
</style>
