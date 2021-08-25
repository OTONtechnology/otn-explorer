<template>
  <nuxt-link class="addressTableItem" :to="localePath('/address')">
    <span
      class="
        addressTableItem__cell
        addressTableItem__cell_address
        addressTableItem__cell_pseudoEl
        addressTableItem__cell_hover
      "
    >
      <span>{{ row.address }}</span>
    </span>
    <span class="addressTableItem__cell">
      <span>{{ row.totalReceived }}</span>
    </span>
    <span
      class="addressTableItem__cell"
      :class="{ addressTableItem__cell_opacity: row.totalSent === 0 }"
    >
      {{ row.totalSent }}
    </span>
    <span class="addressTableItem__cell addressTableItem__balance">
      {{ row.balance }}
    </span>
  </nuxt-link>
</template>

<script>
export default {
  name: "AddressesTableItem",
  components: {},
  props: {
    row: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="stylus" scoped>
.addressTableItem {
  position: relative;
  z-index: 3;
  display: block;

  &:hover {
    background-color: $colorBg;

    & .addressTableItem__cell_hover {
      color: $colorLink;

      & span:hover {
        color: $colorDanger;
      }
    }

    & .addressTableItem__cell_pseudoEl::after {
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, $colorBg 100%);
    }
  }

  &__cell {
    max-height: 16px;
    overflow: hidden;

    &:not(:first-of-type) {
      text-align: right;
    }

    &_address {
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

    &_opacity {
      opacity: 0.4;
    }
  }

  &__balance {
    font-weight: 700;
  }
}
</style>
