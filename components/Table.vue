<template>
  <div class="base-content">
    <div class="base-content-inner">
      <span class="base-title">
        {{ $t(pageTitle) }}
      </span>
      <slot />
    </div>
  </div>
</template>

<script>
import homePage from "@/utils/homePage.js";

export default {
  name: "Table",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    pageTitle() {
      if (homePage.includes(this.$route.path)) {
        return "Latest Transactions";
      }
      const pathArr = this.$route.path.split("/");
      return pathArr[pathArr.length - 1].replace(/(^|\s)[a-z]/g, (x) =>
        x.toUpperCase()
      );
    },
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
.base-content {
  flex-grow: 1;
}

.base-content-inner {
  padding: 10px;
  border-radius: 8px;
  background-color: $colorFiller;

  +mediaDesktop() {
    padding: 16px 24px 24px;
  }
}

.base-title {
  display: block;
  margin-bottom: 18px;
  color: $colorFontBase;
  getFontSubtitle();
  opacity: 0.4;
}
</style>
