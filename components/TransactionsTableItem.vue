<template>
  <div class="transactionsTableItem">
    <div class="transactionsTableItem__dateTime">
      <span
        class="
          transactionsTableItem__cell
          transactionsTableItem__date
          transactionsTableItem__date_desktop
        "
      >
        {{ row.showDate ? row.date : "" }}
      </span>
      <span
        class="
          transactionsTableItem__cell
          transactionsTableItem__date
          transactionsTableItem__date_mobile
        "
      >
        {{ row.date }}
      </span>
      <span class="transactionsTableItem__cell transactionsTableItem__time">
        {{ row.time }}
      </span>
      <span
        class="
          transactionsTableItem__cell
          transactionsTableItem__type
          transactionsTableItem__type_mobile
        "
      >
        {{ $t(row.type) }}
      </span>
    </div>
    <span
      class="
        transactionsTableItem__cell
        transactionsTableItem__hash
        transactionsTableItem__pseudoEl
        transactionsTableItem__cell_hover
      "
    >
      <nuxt-link
        class="transactionsTableItem__link transactionsTableItem__link_hash"
        :to="localePath(`/transaction/${row.hash}`)"
      >
        {{ row.hash }}
      </nuxt-link>
    </span>
    <span class="transactionsTableItem__cell transactionsTableItem__type">
      {{ $t(row.type) }}
    </span>
    <div
      class="transactionsTableItem__cell transactionsTableItem__addressesGroup"
    >
      <span
        class="transactionsTableItem__cell_hover"
        :class="{
          transactionsTableItem__address: row.from.length > 1,
        }"
      >
        <template v-if="row.from.length > 1">
          {{ $tc("address", row.from.length) }}
        </template>
        <template v-else>
          <nuxt-link
            class="transactionsTableItem__link transactionsTableItem__pseudoEl"
            :to="localePath(`/address/${row.from[0]}`)"
          >
            {{ row.from[0] }}
          </nuxt-link>
        </template>
      </span>
      <span class="">
        <svg-icon
          name="transactions/arrow"
          class="transactionsTableItem__arrowIcon"
        />
      </span>
      <span
        class="transactionsTableItem__cell_hover"
        :class="{
          transactionsTableItem__address: row.to.length > 1,
        }"
      >
        <template v-if="row.to.length > 1">
          {{ $tc("address", row.to.length) }}
        </template>
        <template v-else>
          <nuxt-link
            v-if="row.to[0]"
            class="transactionsTableItem__link transactionsTableItem__pseudoEl"
            :to="localePath(`/address/${row.to[0]}`)"
          >
            {{ row.to[0] }}
          </nuxt-link>
          <template v-else> n/a </template>
        </template>
      </span>
    </div>
    <div class="transactionsTableItem__cell transactionsTableItem__sum">
      <div
        v-for="sumItem in row.sum"
        :key="sumItem.name + sumItem.amount"
        class="transactionsTableItem__sumInner"
      >
        <span>{{ sumItem.amount }}</span>
        <span
          :title="sumItem.name.toUpperCase()"
          class="transactionsTableItem__pseudoEl"
        >
          {{ sumItem.name }}
        </span>
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

  +mediaDesktop() {
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

      .transactionsTableItem__pseudoEl::after {
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, $colorBg 100%);
      }
    }
  }

  &__cell {
    overflow: hidden;
    grid-column: 1 / 2;

    +mediaDesktop() {
      grid-column-start: unset;
      grid-column-end: unset;
    }
  }

  &__dateTime {
    +mediaDesktop() {
      display: grid;
      grid-template-columns: 58px 75px;
      grid-column-gap: 8px;
    }
  }

  &__hash {
    order: -1;

    +mediaDesktop() {
      order: unset;
    }
  }

  &__pseudoEl {
    position: relative;
    z-index: 1;
    overflow: hidden;

    &::after {
      position: absolute;
      z-index: 2;
      top: 0;
      right: 0;
      content: '';
      display: block;
      width: 12px;
      height: 100%;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, $colorFiller 100%);
    }
  }

  &__date {
    &_mobile {
      margin-right: 2px;

      +mediaDesktop() {
        display: none;
      }
    }

    &_desktop {
      display: none;

      +mediaDesktop() {
        display: block;
      }
    }
  }

  &__time {
    margin-right: 12px;

    +mediaDesktop() {
      margin-right: 0;
    }
  }

  &__type {
    display: none;

    &_mobile {
      display: inline;
    }

    +mediaDesktop() {
      display: block;

      &_mobile {
        display: none;
      }
    }
  }

  &__link {
    display: block;
    color: $colorLink;

    &_hash {
      font-weight: 700;
    }

    +mediaDesktop() {
      color: $colorFontBase;

      &_hash {
        font-weight: 400;
      }
    }
  }

  &__arrowIcon {
    display: block;
    margin-top: 4px;
    width: 9px;
    height: 9px;
  }

  &__addressesGroup {
    display: grid;
    grid-gap: 0 9px;
    grid-template-columns: minmax(50px, max-content) 10px minmax(50px, max-content);

    +mediaDesktop() {
      grid-gap: 0 10px;
      grid-template-columns: 168px 10px 168px;
    }
  }

  &__address {
    text-transform: lowercase;
    opacity: 0.4;
  }

  &__sum {
    text-align: right;
    font-weight: 700;
    grid-column: 2 / 3;
    grid-row: 1 / 4;

    +mediaDesktop() {
      grid-column-start: unset;
      grid-column-end: unset;
      grid-row-start: unset;
      grid-row-end: unset;
    }
  }

  &__sumInner {
    overflow: hidden;
    display: flex;

    &:not(:last-of-type) {
      margin-bottom: 4px;
    }

    span:first-of-type {
      display: inline-block;
      width: calc(70% - 2px);
      text-align: right;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    span:last-of-type {
      display: inline-block;
      margin-left: 4px;
      width: calc(30% - 2px);
      opacity: 0.4;
      text-transform: uppercase;
      text-align: left;
    }

    +mediaDesktop() {
      display: grid;
      grid-template-columns: minmax(60%, max-content) auto;
      justify-content: flex-end;
      max-height: 18px;

      span:first-of-type {
        width: auto;
      }

      span:last-of-type {
        width: auto;
        min-width: 30px;
        max-width: 34px;
      }
    }
  }
}
</style>
