// src/api.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.example.com/", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  login(credentials) {
    return apiClient.post("/login", credentials);
  },
  getBalance() {
    return apiClient.get("/wallet/balance");
  },
  addTransaction(transaction) {
    return apiClient.post("/wallet/transactions", transaction);
  },
  getPaymentMethods() {
    return apiClient.get("/payment/methods");
  },
};
