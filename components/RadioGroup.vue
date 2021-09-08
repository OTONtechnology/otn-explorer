<template>
  <div class="radioGroup" :class="{ radioGroup_uppercase: uppercase }">
    <label v-for="btn in buttons.array" :key="btn.name" class="radioLabel">
      <input
        type="radio"
        :name="buttons.name"
        class="radioInput"
        :checked="buttons.active === btn.name"
        @change="pick(btn.name)"
      />
      <span class="radioText">
        {{ btn.text }}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'AddressButtonGroup',
  props: {
    buttons: {
      type: Object,
      required: true,
    },
    uppercase: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    pick(name) {
      this.$emit('pick', name);
    },
  },
};
</script>

<style lang="stylus" scoped>
.radioGroup {
  display: flex;
  flex-wrap: wrap;

  &_uppercase {
    .radioLabel:not(:first-of-type) .radioText {
      text-transform: uppercase;
    }
  }
}

.radioInput {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}

.radioText {
  display: block;
  padding: 7px 8px;
  border: 2px solid #F0EDEA;
  background-color: $colorFiller;
  getFont();
  line-height: 1;
  color: $colorFontBase;
}

.radioInput:checked + .radioText {
  border: 2px solid $colorFontBase;
  background-color: $colorFontBase;
  color: $colorFiller;
}

.radioLabel {
  display: block;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  &:first-of-type .radioText {
    border-radius: 4px 0 0 4px;
  }

  &:last-of-type .radioText {
    border-radius: 0 4px 4px 0;
  }

  &:not(:last-of-type) .radioText {
    border-right: none;
  }
}
</style>
