<template>
  <div class="tableHead">
    <span
      v-for="title in titles"
      :key="title.name"
      class="tableHead__cell"
      :class="[
        { lastCellLeft: lastCellLeft },
        { lastCellMR: lastCellMR },
        { lastCellMRTrans: lastCellMRTrans },
      ]"
    >
      <template v-if="title.text">
        {{ $t(title.text) }}
      </template>
    </span>
  </div>
</template>

<script>
export default {
  name: 'TableHead',
  props: {
    titles: {
      type: Array,
      required: true,
    },
    lastCellLeft: {
      type: Boolean,
      default: false,
    },
    lastCellMR: {
      type: Boolean,
      default: false,
    },
    lastCellMRTrans: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    page() {
      const pathArr = this.$route.path.split('/');
      return pathArr[pathArr.length - 1];
    },
  },
};
</script>

<style lang="stylus" scoped>
.tableHead {
  &__cell {
    opacity: 0.4;

    &:last-of-type {
      +mediaDesktop() {
        text-align: left;
      }
    }
  }
}

.lastCellLeft {
  &:last-of-type {
    text-align: left;
  }
}

.lastCellMR {
  &:last-of-type {
    margin-right: 55px;
    text-align: right;
  }
}

.lastCellMRTrans {
  &:last-of-type {
    margin-right: 40px;
  }
}
</style>
