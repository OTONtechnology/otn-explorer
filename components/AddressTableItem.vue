<template>
  <div class="addressTableItem">
    <span
      class="
        addressTableItem__cell
        addressTableItem__date
        addressTableItem__date_desktop
      "
    >
      {{ row.showDate ? row.date : "" }}
    </span>
    <span
      class="
        addressTableItem__cell
        addressTableItem__date
        addressTableItem__date_mobile
      "
    >
      {{ row.date }}
    </span>
    <span
      class="
        addressTableItem__cell addressTableItem__time addressTableItem__mobile
      "
    >
      {{ row.time }}
    </span>
    <span
      class="
        addressTableItem__cell
        addressTableItem__hash
        addressTableItem__cell_pseudoEl
        addressTableItem__cell_hover
      "
    >
      <nuxt-link
        class="addressTableItem__link addressTableItem__link_hash"
        :to="localePath(`/transaction/${row.hash}`)"
      >
        {{ row.hash }}
      </nuxt-link>
    </span>
    <span
      class="
        addressTableItem__cell addressTableItem__type addressTableItem__mobile
      "
    >
      {{ $t(row.type) }}
    </span>
    <span
      class="
        addressTableItem__cell
        addressTableItem__cell_pseudoEl
        addressTableItem__cell_hover
      "
      :class="{
        addressTableItem__addresses: row.senderRecipient.length > 1,
      }"
    >
      <template v-if="row.senderRecipient.length > 1">
        {{ $tc("address", row.senderRecipient.length) }}
      </template>
      <template v-else>
        <nuxt-link
          class="addressTableItem__link"
          :to="localePath(`/address/${row.senderRecipient[0]}`)"
        >
          {{ row.senderRecipient[0] }}
        </nuxt-link>
      </template>
    </span>
    <div class="addressTableItem__cell addressTableItem__sum">
      <div
        v-for="sumItem in row.sum"
        :key="sumItem.name"
        class="addressTableItem__sumInner"
      >
        <span :class="{ success: !row.isSender, danger: row.isSender }">
          {{ sumItem.amount }}
        </span>
        <span :title="sumItem.name.toUpperCase()">{{ sumItem.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressTableItem',
  props: {
    row: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
.addressTableItem {
  position: relative;
  z-index: 3;

  +mediaDesktop() {
    &:hover {
      background-color: $colorBg;

      .addressTableItem__link {
        color: $colorLink;

        &:hover {
          color: $colorDanger;
        }
      }

      .addressTableItem__cell_pseudoEl::after {
        background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, $colorBg 100%);
      }
    }
  }

  &__link {
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

  &__date {
    &_mobile {
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

  &__mobile {
    position: absolute;

    +mediaDesktop() {
      position: static;
    }
  }

  &__cell {
    overflow: hidden;
    grid-column: 1 / 2;

    +mediaDesktop() {
      grid-column-start: unset;
      grid-column-end: unset;
    }

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

  &__time {
    top: 23px;
    left: 50px;

    +mediaTablet() {
      top: 26px;
      left: 60px;
    }
  }

  &__type {
    top: 23px;
    left: 90px;

    +mediaTablet() {
      top: 26px;
      left: 110px;
    }
  }

  &__hash {
    order: -1;

    +mediaDesktop() {
      order: unset;
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
    margin-bottom: 4px;
    max-height: 18px;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;

    span:first-of-type {
      display: inline-block;
      width: calc(70% - 2px);
      overflow: hidden;
      text-overflow: ellipsis;

      +mediaTablet() {
        width: calc(100% - 65px);
      }

      &.success {
        color: $colorSuccess;
      }

      &.danger {
        color: $colorDanger;
      }
    }

    span:last-of-type {
      position: relative;
      display: inline-block;
      left: 4px;
      width: calc(30% + 10px);
      opacity: 0.4;
      text-transform: uppercase;
      text-align: left;
      overflow: hidden;

      +mediaTablet() {
        width: 50px;
        margin-left: 4px;
        left: 0;
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
  }
}
</style>
