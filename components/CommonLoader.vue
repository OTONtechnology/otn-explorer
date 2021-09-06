<template>
  <div
    v-if="state === 'PENDING' || state === 'INIT' || active"
    :class="['commonLoader', { placeholder: isPlaceholder, top }]"
  >
    <div class="spinnerBox">
      <CommonSpinner />
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'CommonLoader',

  props: {
    state: {
      type: String,
      require: false,
      default: '',
    },
    isPlaceholder: {
      type: Boolean,
      require: false,
    },
    active: {
      type: Boolean,
      require: false,
    },
    top: {
      type: Boolean,
      require: false,
    },
  },
};
</script>

<style lang="stylus" scoped>
.commonLoader {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  &.placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background: rgba(#fff, 0.4);
  }

  &.top {
    align-items: flex-start;
  }
}

.spinnerBox {
  width: 60px;
  height: 60px;
}
</style>
