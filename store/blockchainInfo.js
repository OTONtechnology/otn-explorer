import {
  FULFILLED, INIT, PENDING, REJECTED
} from '~/utils/constants';

const initState = {
  timeoutId: 0,
  fetchState: INIT,
  data: {
    nodes: 0,
    height: 0,
    uptime_day: 0,
    rewards: {
      all: 0,
      today: 0
    },
    wallets: {
      all: 0,
      active: 0
    }
  }
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
    if (
      s.fetchState === PENDING
      || s.fetchState === REJECTED
      || s.fetchState === INIT
    ) {
      return [];
    }
    const {
      nodes, height, uptime_day: uptimeDay, rewards, wallets
    } = s.data;

    return [
      {
        label: 'Nodes',
        value: nodes
      },
      {
        label: 'Block height',
        value: height
      },
      {
        label: 'Uptime, days',
        value: uptimeDay
      },
      {
        label: 'Earned in total',
        value: rewards.all
      },
      {
        label: 'Earned today',
        value: rewards.today
      },
      {
        label: 'Wallets',
        value: wallets.all
      },
      {
        label: 'Active wallets',
        value: wallets.active
      }
    ];
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
      const transactions = await this.$axios.$get('/info');

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
