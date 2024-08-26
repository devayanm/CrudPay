// src/store/modules/payment.js
import api from "@/api";

const state = {
  paymentMethods: [],
  currentPaymentMethod: null,
};

const mutations = {
  SET_PAYMENT_METHODS(state, methods) {
    state.paymentMethods = methods;
  },
  SET_CURRENT_PAYMENT_METHOD(state, method) {
    state.currentPaymentMethod = method;
  },
};

const actions = {
  async fetchPaymentMethods({ commit }) {
    try {
      // Assuming you have an API module to handle HTTP requests
      const response = await api.getPaymentMethods();
      commit("SET_PAYMENT_METHODS", response.data.methods);
    } catch (error) {
      console.error("Failed to fetch payment methods:", error);
    }
  },
  selectPaymentMethod({ commit }, method) {
    commit("SET_CURRENT_PAYMENT_METHOD", method);
  },
};

const getters = {
  availablePaymentMethods(state) {
    return state.paymentMethods;
  },
  selectedPaymentMethod(state) {
    return state.currentPaymentMethod;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
