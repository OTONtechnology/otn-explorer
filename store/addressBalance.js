import {
  FULFILLED, INIT, PENDING, REJECTED
} from '~/utils/constants';

const initState = {
  fetchState: INIT,
  balance: {}
};

export const state = () => ({
  ...initState
});

export const mutations = {
  UPDATE_DATA(s, balance) {
    s.balance = balance;
  },
  CLEAR(s) {
    Object.assign(s, initState);
  },
  SET_STATE(s, fetchState) {
    s.fetchState = fetchState;
  }
};

export const actions = {
  async fetch({ commit }, address) {
    if (typeof address !== 'string' || address.length !== 40) {
      commit('SET_STATE', REJECTED);
    }

    if (state.fetchState === PENDING) {
      return;
    }

    commit('SET_STATE', PENDING);

    try {
      const response = await this.$axios.$get(`/address/${address}/balance`);

      commit('UPDATE_DATA', response.data);
      commit('SET_STATE', FULFILLED);
    } catch (err) {
      commit('SET_STATE', REJECTED);
      console.error(err);
    }
  }
};
