// src/store/modules/wallet.js
import api from "@/api";

const state = {
  balance: 0,
  transactions: [],
};

const mutations = {
  SET_BALANCE(state, balance) {
    state.balance = balance;
  },
  ADD_TRANSACTION(state, transaction) {
    state.transactions.push(transaction);
  },
};

const actions = {
  async fetchBalance({ commit }) {
    try {
      // Assuming you have an API module to handle HTTP requests
      const response = await api.getBalance();
      commit("SET_BALANCE", response.data.balance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  },
  async addTransaction({ commit }, transaction) {
    try {
      // Assuming you have an API module to handle HTTP requests
      await api.recordTransaction(transaction);
      commit("ADD_TRANSACTION", transaction);
    } catch (error) {
      console.error("Failed to add transaction:", error);
    }
  },
};

const getters = {
  formattedBalance(state) {
    return `$${state.balance.toFixed(2)}`;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
