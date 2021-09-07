import { isEmpty, prop } from "rambda";
import {
  FULFILLED, INIT, PENDING, REJECTED
} from "~/utils/constants";

const initState = {
  fetchState: INIT,
  transaction: {}
};

export const state = () => ({
  ...initState
});

export const mutations = {
  UPDATE_TRANSACTION(s, transaction) {
    s.transaction = transaction;
  },
  CLEAR(s) {
    Object.assign(s, initState);
  },
  SET_STATE(s, fetchState) {
    s.fetchState = fetchState;
  }
};

export const getters = {
  transaction({ transaction }) {
    if (!transaction || isEmpty(transaction)) {
      return {};
    }

    /**
     * const t = {
     *   id: "3c7bbff13034438bdf7996a6a9c6c0416af2f98a825e9a78dd3ecfe97cd1e1c2",
     *   type: "create_amc",
     *   fee: { amount: "0.0001", ticker: "testBitboneCoin" },
     *   block: {
     *     height: 6,
     *     hash:
     *       "b82d51cf82199ab7218a11775a39f444945960b7236221bf213efedc1b30fef9",
     *     timestamp: 1630501907
     *   },
     *   inputs: [
     *     {
     *       address: "944940a5d3ab262f939b8be0c7ebf2a52a7ff038",
     *       amount: "0.0001",
     *       ticker: "testBitboneCoin",
     *       sequence: 2,
     *       initiator: null
     *     }
     *   ],
     *   outputs: []
     * };
     */

    return {
      ...transaction,

      date: transaction.block.timestamp,

      hash: transaction.block.hash,
      type: "Distribution",
      from: transaction.inputs[0].address,
      to: transaction.outputs.map(prop("address")),
      sum: transaction.inputs[0].amount
    };
  }
};

export const actions = {
  async fetchByHash({ commit }, hash) {
    if (typeof hash !== "string" || hash.length !== 64) {
      commit("SET_STATE", REJECTED);
    }

    if (state.fetchState === PENDING) {
      return;
    }

    commit("SET_STATE", PENDING);

    try {
      const response = await this.$axios.$get(`/transaction/${hash}`);

      commit("UPDATE_TRANSACTION", response.data);
      commit("SET_STATE", FULFILLED);
    } catch (err) {
      commit("SET_STATE", REJECTED);
      console.error(err);
    }
  }
};
