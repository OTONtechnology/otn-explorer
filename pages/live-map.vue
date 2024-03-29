<template>
  <div class="container">
    <WithLoader :state="infoState">
      <div class="infoWrapper">
        <div class="infoWrapperItems">
          <div v-for="item in info" :key="item.label" class="infoItem">
            <div class="infoLabel">{{ $t(item.label) }}</div>
            <div class="infoValue">{{ item.value }}</div>
          </div>
        </div>
      </div>
    </WithLoader>
    <LiveMapChart />
    <div class="validatorsList">
      <div class="infoLabel validator">{{ $t("Node queue") }}</div>
      <WithLoader :state="validatorsState">
        <div>
          <div
            v-for="item in validators"
            :key="item.validator_address"
            class="validatorAddress"
          >
            {{ item.reward_address }}
            <div class="validatorNumber">{{ item.id }}</div>
          </div>
        </div>
      </WithLoader>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

// all imports u can see inside nuxt.config.js
export default {
  name: 'LiveMap',

  layout: 'darkMap',

  data() {
    return {}
  },

  computed: {
    ...mapState({
      infoState: 'blockchainInfo/fetchState',
      validatorsState: 'blockchainValidators/fetchState',
    }),
    ...mapGetters({
      info: 'blockchainInfo/data',
      validators: 'blockchainValidators/data',
    })
  },

  mounted() {
    this.fetchInfo();
    this.fetchValidators();
  },

  destroyed() {
    this.clearTimeoutInfo();
    this.clearTimeoutValidators();
    this.$store.commit('blockchainInfo/CLEAR')
    this.$store.commit('blockchainValidators/CLEAR')
  },

  methods: {
    ...mapActions({
      clearTimeoutInfo: 'blockchainInfo/clearTimeout',
      fetchInfo: 'blockchainInfo/fetch',
      fetchValidators: 'blockchainValidators/fetch',
      clearTimeoutValidators: 'blockchainValidators/clearTimeout',
    })
  },

};
</script>

<style lang="stylus" scoped>
.container {
  margin-top: 24px;
  color: $colorFontBase;
  position: relative;
  width: 100%;
  min-height: 300px;
  height: calc(100vh - 176px);
}

.infoWrapper {
  max-width: 100%;
  position: relative;
  z-index: 10;

  +mediaTablet() {
    padding-left: 196px;
  }
}

.infoWrapperItems {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  overflow: auto;
  max-width: 100%;
  padding: 2px 0;
}

.infoItem {
  padding: 0 5px;

  +mediaTablet() {
    padding: 0 10px;
  }

  &:last-child {
    padding-right: 0;
  }
}

.infoLabel {
  white-space: nowrap;
  opacity: 0.4;
  text-transform: uppercase;
  font-size: 12px;
  margin-bottom: 3px;

  &.validator {
    margin-bottom: 8px;
  }
}

.infoValue {
  white-space: nowrap;
  font-weight: bold;
  font-size: 20px;
  position: relative;
}

.validatorsList {
  display: none;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  overflow: hidden;
  padding-left: 14px;
  width: 162px;
  height: 92%;
  z-index: 10;

  +mediaTablet() {
    display: block;
  }
}

.validatorAddress {
  position: relative;
  font-size: 14px;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &::before {
    content: '';
    background: linear-gradient(90deg, transparent 0%, $colorBg 100%);
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    width: 16px;
  }
}

.validatorNumber {
  position: absolute;
  right: 100%;
  bottom: 0;
  opacity: 0.4;
  margin-right: 4px;
  font-size: 10px;
}
</style>
