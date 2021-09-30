export const state = () => ({
  transactions: []
});

export const mutations = {
  UPDATE_TRANSACTIONS(s, transactions) {
    s.transactions = transactions;
  }
};

export const actions = {
  async fetchByAddress({ commit }, address) {
    const transactions = await this.$axios.$get(
      `/address/${address}/transactions`
    );

    commit('UPDATE_TRANSACTIONS', transactions);
  }
};
