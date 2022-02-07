<template>
  <div class="layoutHeaderLocalePickerWrap">
    <div class="layoutHeaderLocalePicker" @click="menu = !menu">
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
            @click.prevent="menu = false"
          >
            {{ lang.code }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <div :class="['popup', { popup_mobile: menu }]" @mouseleave="menu = false">
      <div class="popupList">
        <div
          v-for="lang in availableLangs"
          :key="lang.code"
          class="popupListItem"
          @click="toggleLang(lang.code)"
        >
          {{ lang.code }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HeaderLocalePicker',

  data() {
    return {
      menu: false
    }
  },

  computed: {
    locale() {
      return this.$i18n.locale;
    },
    availableLangs() {
      return this.$i18n.locales.filter((i) => i.code !== this.locale);
    },
  },

  methods: {
    toggleLang(lang) {
      this.$router.push(this.switchLocalePath(lang));
      this.menu = false;
    }
  }
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
    +mediaTablet() {
      .popup {
        display: block;
        opacity: 1;
        z-index: 20;
      }
    }
  }
}

.currentValue {
  color: $colorFontBase;
  getFontSubtitle();
  line-height: 14px;

  +mediaTablet() {
    &_loginPage {
      color: $colorFiller;
    }
  }
}

.langPickerIcon {
  display: block;
  margin-right: 5px;
  width: 14px;
  height: 14px;
  color: $colorFontBase;
}

.popup {
  position: absolute;
  display: none;
  background: $colorFiller;
  top: calc(100% - 6px);
  right: -4px;
  border-radius: 4px;
  transition: all 0.1s;
  color: $colorFontBase;
  opacity: 0;
  z-index: -1;

  &_mobile {
    display: block;
    opacity: 1;
    z-index: 20;

    +mediaTablet() {
      display: none;
      opacity: 0;
      z-index: -1;
    }
  }
}

.popupList {
  display: flex;
  getFontSubtitle();
  flex-direction: column;
  box-shadow: 0 3px 6px rgba(0, 88, 12, 0.2);
  border-radius: 4px;
}

.popupListItem {
  cursor: pointer;
  padding: 8px;
  width: 24px;
  height: 19px;
  text-transform: uppercase;
  text-align: center;
  transition: all 0.1s;
  background: $colorFiller;
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
