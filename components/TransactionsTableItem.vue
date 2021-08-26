<template>
  <div class="transactionsTableItem" :to="localePath('/transaction')">
    <span class="transactionsTableItem__cell">
      <!-- {{ i === 0 ? $d(row.date, "loopShortFirst") : "" }} -->
      {{ $d(row.date, "loopShortFirst") }}
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
      <nuxt-link class="transactionsTableItem__link" :to="localePath('/transaction')">{{ row.hash }}</nuxt-link>
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
    >
      <nuxt-link class="transactionsTableItem__link" :to="localePath('/address')">{{ row.from }}</nuxt-link>
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
        transactionsTableItem__distrTo: row.type === 'Distribution',
      }"
    >
      <template v-if="row.type === 'Distribution'">
        {{ $tc("address", row.to) }}
      </template>
      <template v-else>
        <nuxt-link class="transactionsTableItem__link" :to="localePath('/address')">{{ row.to }}</nuxt-link>
      </template>
    </span>
    <span class="transactionsTableItem__cell transactionsTableItem__sum">
      {{ row.sum }}
    </span>
  </div>
</template>

<script>

export default {
  name: "TransactionsTableItem",
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  computed: {
  },
};
</script>

<style lang="stylus" scoped>
.transactionsTableItem {
  position: relative;
  z-index: 3;

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
    max-height: 16px;
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
    width: 9px;
    height: 9px;
  }

  &__distrTo {
    text-transform: lowercase;
    opacity: 0.4;
  }

  &__sum {
    text-align: right;
    font-weight: 700;
  }
}
</style>
