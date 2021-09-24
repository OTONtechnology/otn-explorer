<template>
  <div class="tableTitle">
    <span class="tableTitle__text">
      {{ hash }}
    </span>
    <button class="tableTitle__button" type="button" @click="copy">
      <svg-icon name="common/copy" class="tableTitle__icon" />
    </button>
    <span v-if="copied" class="tableTitle__copied"> copied </span>
  </div>
</template>

<script>
export default {
  name: "CopyHash",
  props: {
    hash: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      copied: false,
    };
  },
  computed: {},
  methods: {
    copy() {
      this.$copyText(this.hash).then(
        (e) => {
          console.log("Copied");
          console.log(e);
        },
        (e) => {
          console.log("Can not copy");
          console.log(e);
        }
      );
      this.copied = true;
      setInterval(() => {
        this.copied = false;
      }, 3000);
    },
  },
};
</script>

<style lang="stylus" scoped>
.tableTitle {
  margin-top: -4px;
  margin-bottom: 10px;
  width: fit-content;

  +mediaTablet() {
    display: grid;
    grid-auto-flow: column;
    grid-column-gap: 9px;
    align-items: center;
    margin-top: -14px;
    margin-bottom: 16px;
  }

  &__text {
    word-break: break-word;
    font-size: 22px;
    line-height: 30px;
    font-weight: 700;
    margin: 0;

    +mediaTablet() {
      font-size: 24px;
      line-height: 32px;
    }

    +mediaDesktop() {
      word-break: unset;
    }
  }

  &__button {
    display: inline-block;
    margin: 0 -5px -15px -5px;
    padding: 5px;

    +mediaTablet() {
      margin: 0;
      padding: 0;
    }
  }

  &__icon {
    display: block;
    width: 16px;
    height: 16px;
    opacity: 0.3;

    &:hover {
      opacity: 1;
    }

    +mediaTablet() {
      width: 20px;
      height: 20px;
    }
  }

  &__copied {
    margin-left: -3px;
    getFont();
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.62px;
  }
}
</style>
