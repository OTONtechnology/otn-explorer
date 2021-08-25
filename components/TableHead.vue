<template>
  <div class="tableHead">
    <span
      v-for="title in titles"
      :key="title.name"
      class="tableHead__cell"
      :class="`tableHead__cell_${page}`"
    >
      <template v-if="title.text">
        {{ $t(title.text) }}
      </template>
    </span>
  </div>
</template>

<script>
export default {
  name: "TableHead",
  components: {},
  props: {
    titles: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    page() {
      const pathArr = this.$route.path.split("/");
      return pathArr[pathArr.length - 1];
    },
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
.tableHead {
  &__cell {
    opacity: 0.4;

    &_addresses {
      &:not(:first-of-type) {
        text-align: right;
      }
    }

    &_transactions {
      &:last-of-type {
        text-align: right;
      }
    }
  }
}
</style>
