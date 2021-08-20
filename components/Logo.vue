<template>
  <div class="logoBox">
    <svg class="logo">
      <use :xlink:href="`#logo-${logoName}--sprite`" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import '@/assets/logo-main.svg?sprite'
import '@/assets/logo-white.svg?sprite'

export default defineComponent({
  name: 'Logo',
  components: {},
  props: {
    logoName: {
      type: String as PropType<'main' | 'white'>,
      require: false,
      default: 'main',
    },
  },
})
</script>

<style lang="stylus" scoped>
.logoBox {
  display: flex;
  align-items: flex-end;
  justify-content: center;

  mediaDesktop() {
    justify-content: unset;
  }
}

.logo {
  width: 88px;
  height: 48px;
}
</style>
