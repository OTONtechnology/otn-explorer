<template>
  <div>
    <!-- <transition :name="transitionName"> -->
    <!-- </transition> -->
    <transition :name="transitionName">
      <template v-if="loadMore">
        <slot />
      </template>

      <template v-else>
        <slot v-if="state === 'FULFILLED'" />
      </template>
    </transition>
    <CommonLoader
      v-if="state === 'PENDING' || state === 'INIT' || active"
      :state="state"
      :isPlaceholder="isPlaceholder"
      :active="active"
      :top="top"
    />
    <!-- <transition :name="transitionName"> -->
    <div v-if="state === 'REJECTED'" class="NoData">
      <NotFound />
    </div>
    <!-- </transition> -->
  </div>
</template>

<script>
import { FULFILLED } from '@/utils/constants';

export default {
  name: 'WithLoader',
  components: {},
  props: {
    state: {
      type: String,
      default: FULFILLED
    },
    isPlaceholder: Boolean,
    active: Boolean,
    top: Boolean,
    transitionName: {
      type: String,
      default: 'fade-enter',
    },
    loadMore: {
      type: Boolean
    }
  },
};
</script>

<style lang="stylus" scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter-to {
  opacity: 1;
}

.NoData {
  width: 100%;
}
</style>
