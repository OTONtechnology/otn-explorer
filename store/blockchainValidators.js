import {
  FULFILLED, INIT, PENDING, REJECTED
} from '~/utils/constants';

const initState = {
  timeoutId: 0,
  fetchState: INIT,
  data: []
};

export const state = () => ({
  ...initState
});

export const mutations = {
  SET_STATE(s, fetchState) {
    s.fetchState = fetchState;
  },
  SET_DATA(s, data) {
    s.data = data;
  },
  CLEAR(s) {
    Object.assign(s, initState);
  },
  SET_TIMEOUT(s, id) {
    s.timeoutId = id;
  }
};

export const getters = {
  data(s) {
    return s.data.map((item, i) => ({ ...item, id: i + 1 }));
  }
};

export const actions = {
  clearTimeout({ state, commit }) {
    if (!state.timeoutId) {
      return;
    }

    window.clearTimeout(state.timeoutId);
    commit('SET_TIMEOUT', 0);
  },
  async fetch({ commit, state, dispatch }, silentFetch) {
    if (state.fetchState === PENDING) {
      return;
    }

    if (!silentFetch) {
      commit('SET_STATE', PENDING);
    }

    try {
      const transactions = await this.$axios.$get('/info/validators');

      commit('SET_DATA', transactions.data);
      commit('SET_STATE', FULFILLED);

      const id = setTimeout(() => dispatch('fetch', true), 1000 * 6);

      commit('SET_TIMEOUT', id);
    } catch (err) {
      commit('SET_STATE', REJECTED);
      console.error(err);
    }
  }
};
