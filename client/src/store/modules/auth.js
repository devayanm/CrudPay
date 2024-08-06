// src/store/modules/auth.js
import api from "@/api";

const state = {
  user: null,
  token: localStorage.getItem("token") || "",
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  CLEAR_AUTH(state) {
    state.user = null;
    state.token = "";
    localStorage.removeItem("token");
  },
};

const actions = {
  async login({ commit }, credentials) {
    try {
      // Assuming you have an API module to handle HTTP requests
      const response = await api.login(credentials);
      commit("SET_USER", response.data.user);
      commit("SET_TOKEN", response.data.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  },
  logout({ commit }) {
    commit("CLEAR_AUTH");
    // Optionally, redirect to login page
  },
};

const getters = {
  isAuthenticated(state) {
    return !!state.token;
  },
  currentUser(state) {
    return state.user;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
