<template>
  <div class="addressTableItem">
    <span class="addressTableItem__cell">
      {{ row.showDate ? row.date : "" }}
    </span>
    <span class="addressTableItem__cell">
      {{ row.time }}
    </span>
    <span
      class="
        addressTableItem__cell
        addressTableItem__cell_pseudoEl
        addressTableItem__cell_hover
      "
    >
      <nuxt-link
        class="addressTableItem__link"
        :to="localePath(`/transaction/${row.hash}`)"
      >
        {{ row.hash }}
      </nuxt-link>
    </span>
    <span class="addressTableItem__cell">
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
        <span>{{ sumItem.name }}</span>
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

  &__cell {
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

      &.success {
        color: $colorSuccess;
      }

      &.danger {
        color: $colorDanger;
      }
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
