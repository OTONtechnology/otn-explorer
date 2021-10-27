import {
  FULFILLED, INIT, PENDING, REJECTED
} from '~/utils/constants';

/*
{
  "id": "196793a23392da2826540fdff34f82936a81f81d89dbfeb65ff28009906e7380",
  "type": "buy_in_amc",
  "fee": {
      "amount": "0.0001",
      "ticker": "bitboneCoin"
  },
  "block": {
      "height": 16,
      "hash": "b055e1daab150770768b7cc3b633aefc4cfb400010871023186c0e3cdb58f28e",
      "timestamp": 1630927822
  },
  "inputs": [
      {
          "address": "944940a5d3ab262f939b8be0c7ebf2a52a7ff038",
          "amount": "0.0001",
          "ticker": "bitboneCoin",
          "sequence": 13
      }
  ],
  "outputs": [
      {
          "address": "944940a5d3ab262f939b8be0c7ebf2a52a7ff038",
          "amount": "0.0050",
          "ticker": "bitboneCoin"
      }
  ]
}
*/

const initState = {
  fetchState: INIT,
  transactions: [],
  lastTxid: '',
  limit: 25,
  btnMore: false,
};

export const state = () => ({
  ...initState
});

export const mutations = {
  UPDATE_DATA(s, transactions) {
    s.transactions = transactions;
  },
  CLEAR(s) {
    Object.assign(s, initState);
  },
  SET_STATE(s, fetchState) {
    s.fetchState = fetchState;
  },
  SET_LASTTXID(s, lastTxid) {
    s.lastTxid = lastTxid;
  },
  SET_BTN_MORE(s, length) {
    s.btnMore = (length % 25 === 0 && length !== 0)
  },
};

export const actions = {
  async fetch({ commit, state }, address) {
    if (typeof address !== 'string' || address.length !== 40) {
      commit('SET_STATE', REJECTED);
    }

    if (state.fetchState === PENDING) {
      return;
    }

    commit('SET_STATE', PENDING);

    try {
      const response = await this.$axios.$get(
        `/address/${address}/transactions`,
        {
          params: {
            last_txid: state.lastTxid,
            limit: state.limit
          }
        }
      );

      commit('UPDATE_DATA', response.data);
      try {
        commit('SET_LASTTXID', response.data[response.data.length - 1].id);
        commit('SET_BTN_MORE', response.data.length);
      } catch (err) {
        commit('SET_BTN_MORE', 0);
        console.error(err);
        console.error(response.data);
      }
      commit('SET_STATE', FULFILLED);
    } catch (err) {
      commit('SET_STATE', REJECTED);
      console.error(err);
    }
  }
};
