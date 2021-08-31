<template>
  <div class="layoutHeaderLocalePicker">
    <svg-icon name="common/lang-picker" class="langPickerIcon" />

    <div class="currentValue">
      {{ locale }}
    </div>

    <div class="popup">
      <div class="popupList">
        <nuxt-link
          v-for="lang in availableLangs"
          :key="lang.code"
          class="popupListItem"
          :to="switchLocalePath(lang.code)"
        >
          {{ lang.code }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HeaderLocalePicker',

  computed: {
    locale() {
      return this.$i18n.locale;
    },
    availableLangs() {
      return this.$i18n.locales.filter((i) => i.code !== this.locale);
    },
  },
};
</script>

<style lang="stylus" scoped>
.layoutHeaderLocalePicker {
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 0;
  position: relative;
  color: $colorFontBase;

  &:hover {
    .popup {
      opacity: 1;
      z-index: 20;
    }
  }
}

.currentValue {
  color: $colorDanger;
  getFontSubtitle();
  line-height: 14px;

  +mediaTablet() {
    color: $colorFontBase;

    &_loginPage {
      color: $colorFiller;
    }
  }
}

.langPickerIcon {
  display: none;
  margin-right: 5px;
  width: 14px;
  height: 14px;
  color: $colorFontBase;

  +mediaTablet() {
    display: block;
  }
}

.popup {
  position: absolute;
  background: #ffffff;
  top: 1px;
  left: calc(100% + 11px);
  border-radius: 4px;
  transition: all 0.1s;
  color: $colorFontBase;

  +mediaTablet() {
    top: calc(100% - 6px);
    left: unset;
    right: -4px;
    opacity: 0;
    z-index: -1;
  }
}

.popupList {
  display: flex;
  getFontSubtitle();

  +mediaTablet() {
    flex-direction: column;
    box-shadow: 0 3px 6px rgba(0, 88, 12, 0.2);
    border-radius: 4px;
  }
}

.popupListItem {
  cursor: pointer;
  padding: 8px;
  width: 24px;
  height: 19px;
  text-transform: uppercase;
  text-align: center;
  transition: all 0.1s;
  background: #fff;
  box-sizing: content-box;
  line-height: 19px;

  &:first-of-type {
    border-radius: 4px 4px 0 0;
  }

  &:last-of-type {
    border-radius: 0 0 4px 4px;
  }

  &:hover {
    background-color: $colorBg;
  }

  +mediaTablet() {
    padding: 0;
    box-sizing: border-box;
  }
}
</style>
