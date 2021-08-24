<template>
  <div class="headerContainer">
    <header class="header">
      <nuxt-link class="logoWrapper" :to="localePath('index')">
        <Logo />
      </nuxt-link>
      <button
        type="button"
        class="menuButton"
        :class="{ menuButton_active: mobileMenu }"
        @click="mobileMenu = !mobileMenu"
      >
        <span class="menuButton__inner" />
        <span class="menuButton__inner" />
        <span class="menuButton__inner" />
      </button>
      <HeaderMenu />
      <div
        class="localePickerBox"
        :class="{ localePickerBox_mobile: mobileMenu }"
      >
        <HeaderLocalePicker />
      </div>

      <!-- <div class="buttonsBox" :class="{ buttonsBox_mobile: mobileMenu }">
        <button class="logoutButton">
          {{ userEmail }}
        </button>
        <div class="popup">
          <div class="popup__list">
            <button class="popup__item" @click="logout">
              {{ $t('Log out') }}
            </button>
          </div>
        </div>
      </div> -->
      <!-- <div class="mobileMenuBg" :class="{ mobileMenuBg_on: mobileMenu }">
        <div class="mobileMenuBg__leftcol" @click="mobileMenu = false"></div>
        <div class="mobileMenuBg__rightcol"></div>
      </div> -->
    </header>
    <HeaderSearch />
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      mobileMenu: false,
    };
  },
};
</script>

<style lang="stylus" scoped>
.header {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 8px;

  +mediaTablet() {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding-top: 15px;
  }

  +mediaDesktop() {
    padding: 12px 0 0;
  }
}

.logoWrapper {
  display: block;
  transition: 0.3s;

  +mediaDesktop() {
    margin-right: 40px;
  }
}

.menuButton {
  position: absolute;
  top: 8px;
  right: 4px;
  z-index: 4;
  display: block;
  padding: 10px;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  box-sizing: content-box;

  &__inner {
    position: absolute;
    left: 12px;
    height: 2px;
    background-color: $colorFontBase;
    transition: 0.3s;

    &:first-of-type {
      top: 12px;
    }

    &:first-of-type, &:last-of-type {
      width: 16px;
    }

    &:nth-of-type(2) {
      top: 19px;
      width: 12px;
    }

    &:last-of-type {
      bottom: 12px;
    }
  }

  &_active {
    position: fixed;

    & .menuButton__inner {
      &:first-of-type {
        transform: rotate(45deg);
      }

      &:first-of-type, &:last-of-type {
        top: 19px;
        left: 10px;
        width: 20px;
      }

      &:nth-of-type(2) {
        width: 0%;
      }

      &:last-of-type {
        transform: rotate(-45deg);
      }
    }
  }

  +mediaTablet() {
    display: none;
  }
}

.localePickerBox {
  position: fixed;
  z-index: 4;
  bottom: 50px;
  left: 100vw;
  margin-left: auto;
  color: #fff;
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;

  &_mobile {
    opacity: 1;
    pointer-events: all;
    left: calc(100vw - 271px);
  }

  +mediaTablet() {
    position: static;
    display: block;
    opacity: 1;
    pointer-events: all;

    &:not(:last-child) {
      margin-right: 20px;
    }
  }
}

.buttonsBox {
  &:hover .popup {
    opacity: 1;
    z-index: 20;
  }

  position: fixed;
  z-index: 4;
  top: 160px;
  left: 100vw;
  opacity: 0;
  transition: 0.3s;

  button {
    pointer-events: none;
  }

  &_mobile {
    opacity: 1;
    pointer-events: all;
    left: calc(100vw - 271px);

    button {
      pointer-events: all;
    }
  }

  +mediaTablet() {
    position: relative;
    top: 0;
    left: 0;
    opacity: 1;

    button {
      pointer-events: all;
    }
  }
}

.mobileMenuBg {
  pointer-events: none;

  &__rightcol {
    position: fixed;
    top: 0;
    left: 100vw;
    z-index: 3;
    width: 304px;
    height: 100vh;
    background-color: #fff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
  }

  &__leftcol {
    position: fixed;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 100vw;
    width: calc(100% - 304px);
    opacity: 0.2;
    background-color: $colorPrimary;
    transition: 0.3s;
  }

  &_on {
    opacity: 1;
    pointer-events: all;

    .mobileMenuBg__rightcol {
      left: calc(100% - 304px);
    }

    .mobileMenuBg__leftcol {
      left: 0;
    }
  }

  +mediaTablet() {
    opacity: 0;
    pointer-events: none;
  }
}

.logoutButton {
  margin: 0;
  padding: 0;
  padding-bottom: 14px;
  max-width: 224px;
  word-break: break-word;
  text-align: left;
  border: none;
  background: transparent;

  +getFontSubtitle() {
  }

  line-height: 14px;

  &:focus {
    outline: none;
  }

  &:active {
    color: $colorFontBase;
  }

  +mediaTablet() {
    max-width: 90px;
    padding: 10px 0;
    position: relative;
    left: 1px;
    cursor: pointer;
  }

  +mediaDesktop() {
    max-width: 215px;
  }

  +mediaLarge() {
    max-width: 240px;
  }

  +mediaExtraLarge() {
    max-width: 400px;
  }
}

.popup {
  position: absolute;
  background-color: #fff;
  top: 100%;
  right: 0;
  width: max-content;
  min-width: 100%;
  border-radius: 4px;
  transition: all 0.1s;
  color: $colorFontBase;

  +mediaTablet() {
    opacity: 0;
    z-index: -1;
  }

  &__list {
    padding: 0;
    width: 100%;

    +getFontText() {
    }

    line-height: 18px;

    +mediaTablet() {
      padding: 4px 0;
      box-shadow: 0 3px 6px rgba(0, 88, 12, 0.2);
      border-radius: 4px;
    }
  }

  &__item {
    padding: 4px 0 5px;
    width: 100%;
    border: none;
    cursor: pointer;
    text-align: center;
    transition: all 0.1s;
    background-color: #fff;
    text-align: left;

    +mediaTablet() {
      padding: 3px 8px;

      &:hover {
        background-color: $colorSecond;
      }
    }
  }
}
</style>
