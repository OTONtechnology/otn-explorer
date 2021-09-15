import { isEmpty, prop } from 'rambda';
import {
  FULFILLED, INIT, PENDING, REJECTED
} from '~/utils/constants';

/**
 * transaction
 * {
 *   id:
 *     "6bc48cd237ef5e730924737cdc1e544a5369782ba96c5ec1cfb0a7b53c489c1e",
 *   type: "mint_coins",
 *   fee: { amount: "1", ticker: "testcoin" },
 *   block: {
 *     height: 7,
 *     hash:
 *       "ab7f812fe28797633eeb078d9b1d3e30f8918b8510d909915e8f78cfd7c4ed03",
 *     timestamp: 1630502048
 *   },
 *   inputs: [
 *     {
 *       address: "9ba140cc905073e01da1a1b47fd629dd8f24093f",
 *       amount: "1",
 *       ticker: "testcoin",
 *       sequence: 3,
 *       initiator: null
 *     }
 *   ],
 *   outputs: [
 *     {
 *       address: "944940a5d3ab262f939b8be0c7ebf2a52a7ff038",
 *       amount: "1.0000",
 *       ticker: "testBitboneCoin"
 *     }
 *   ]
 * }
 */

const initState = {
  fetchState: INIT,
  transactions: []
}

export const state = () => ({
  ...initState
});

export const mutations = {
  UPDATE_TRANSACTIONS(s, transactions) {
    s.transactions = transactions;
  },
  SET_STATE(s, fetchState) {
    s.fetchState = fetchState;
  },
  CLEAR(s) {
    Object.assign(s, initState);
  },
};

export const getters = {
  transactionsRows(s) {
    if (!s.transactions || isEmpty(s.transactions)) {
      return [];
    }

    return s.transactions.map(row => ({
      id: row.id,
      timestamp: row.block.timestamp,
      hash: row.id,
      type: 'Transfer',
      from: row.inputs.map(prop('address')),
      to: row.outputs.map(prop('address')),
      sum: row.inputs.map(input => ({
        name: input.ticker,
        amount: input.amount
      }))
    }));
  }
};

export const actions = {
  async fetch({ commit, state }) {
    if (state.fetchState === PENDING) {
      return;
    }

    commit('SET_STATE', PENDING);

    try {
      const transactions = await this.$axios.$get('/transactions?limit=300');

      commit('UPDATE_TRANSACTIONS', transactions.data);
      commit('SET_STATE', FULFILLED);
    } catch (err) {
      commit('SET_STATE', REJECTED);
      console.error(err);
    }
  }
};
