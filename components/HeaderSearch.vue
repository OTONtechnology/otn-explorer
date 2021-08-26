<template>
  <div class="headerSearch">
    <div class="headerSearch__box">
      <div class="headerSearch__inputBox">
        <input
          class="headerSearch__input"
          type="search"
          :placeholder="$t('Transaction or Address')"
        >
      </div>
      <button class="headerSearch__button" type="button">
        <svg-icon name="common/search" class="headerSearch__icon" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderSearch",
};
</script>

<style lang="stylus" scoped>
.headerSearch {
  margin: 28px 0 24px;

  &__box {
    display: flex;
    margin: 0 auto;
    width: 502px;
    height: 44px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 5px 10px 20px -10px $colorFontBase;
  }

  &__input {
    position: relative;
    z-index: 1;
    display: block;
    width: 100%;
    height: 100%;
    padding: 11px 0px 13px 16px;
    border: none;
    getFontButton();
    color: $colorFontBase;

    &::-ms-clear {
      display: none;
      width: 0;
      height: 0;
    }

    &::-ms-reveal {
      display: none;
      width: 0;
      height: 0;
    }

    &::-webkit-search-decoration, &::-webkit-search-cancel-button, &::-webkit-search-results-button, &::-webkit-search-results-decoration {
      display: none;
    }

    &::-webkit-input-placeholder {
      font-weight: normal;
      opacity: 0.6;
    }

    &::-moz-placeholder {
      font-weight: normal;
      opacity: 0.6;
    }

    &:-moz-placeholder {
      font-weight: normal;
      opacity: 0.6;
    }

    &:-ms-input-placeholder {
      font-weight: normal;
      opacity: 0.6;
    }

    &::placeholder {
      font-weight: normal;
      opacity: 0.6;
    }

    &:focus {
      outline: none;
    }
  }

  &__inputBox {
    position: relative;
    flex-grow: 1;

    &::after {
      position: absolute;
      z-index: 2;
      content: '';
      top: 0;
      right: 0;
      width: 32px;
      height: 100%;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    background-color: $colorFontBase;
  }

  &__icon {
    display: block;
    width: 21px;
    height: 21px;
  }
}
</style>
