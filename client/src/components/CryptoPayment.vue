<template>
  <v-container>
    <v-card class="payment-card">
      <v-card-title class="headline">Crypto Payment</v-card-title>
      <v-card-text>
        <v-form ref="cryptoForm" @submit.prevent="handleSubmit">
          <!-- Currency Selector -->
          <v-select
            v-model="selectedCurrency"
            :items="currencies"
            label="Select Cryptocurrency"
            required
            outlined
            dense
          ></v-select>

          <!-- Payment Fields -->
          <v-text-field
            v-model="cryptoAmount"
            label="Amount"
            required
            outlined
            dense
            type="number"
            :rules="amountRules"
          ></v-text-field>
          <v-text-field
            v-model="cryptoAddress"
            label="Crypto Address"
            required
            outlined
            dense
            :rules="addressRules"
          ></v-text-field>

          <!-- Exchange Rate Information -->
          <v-alert v-if="rateInfo" type="info">
            Current exchange rate for {{ selectedCurrency }}: {{ rateInfo.rate }} {{ rateInfo.currency }}
          </v-alert>

          <!-- Payment Summary -->
          <v-card v-if="showSummary" class="summary-card">
            <v-card-title>Payment Summary</v-card-title>
            <v-card-text>
              <p><strong>Amount:</strong> {{ cryptoAmount }} {{ selectedCurrency }}</p>
              <p><strong>Address:</strong> {{ cryptoAddress }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="confirmPayment" color="primary">Confirm Payment</v-btn>
              <v-btn @click="showSummary = false" color="secondary">Cancel</v-btn>
            </v-card-actions>
          </v-card>

          <!-- Loading Indicator -->
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
            class="loading-indicator"
          ></v-progress-circular>

          <v-btn
            type="submit"
            color="primary"
            :loading="loading"
            :disabled="loading || !isValid"
          >
            Pay
          </v-btn>
        </v-form>
        <v-alert v-if="error" type="error">{{ error }}</v-alert>
        <v-alert v-if="success" type="success">{{ success }}</v-alert>
      </v-card-text>
    </v-card>

    <!-- Transaction History -->
    <v-card class="history-card">
      <v-card-title>Recent Payments</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group v-if="transactions.length">
            <v-list-item v-for="transaction in transactions" :key="transaction.id">
              <v-list-item-content>
                <v-list-item-title>{{ transaction.date }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ transaction.amount }} {{ transaction.currency }} to {{ transaction.address }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-alert v-if="!transactions.length" type="info">
            No recent payments.
          </v-alert>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cryptoAmount: "",
      cryptoAddress: "",
      selectedCurrency: "BTC", // Default currency
      error: null,
      success: null,
      loading: false,
      showSummary: false,
      rateInfo: null,
      transactions: [], // Example data; replace with actual API data
      amountRules: [
        (v) => !!v || "Amount is required",
        (v) => v > 0 || "Amount must be greater than zero",
      ],
      addressRules: [
        (v) => !!v || "Crypto address is required",
        (v) => /^[0-9a-zA-Z]{26,35}$/.test(v) || "Invalid crypto address",
      ],
      currencies: ["BTC", "ETH", "LTC", "XRP"], // Add more cryptocurrencies as needed
    };
  },
  computed: {
    isValid() {
      return this.$refs.cryptoForm && this.$refs.cryptoForm.validate();
    },
  },
  methods: {
    async fetchRateInfo() {
      // Simulate rate fetching
      this.rateInfo = {
        rate: "0.00012", // Example rate
        currency: this.selectedCurrency,
      };
    },
    async fetchTransactionHistory() {
      // Simulate fetching transaction history
      this.transactions = [
        {
          id: 1,
          date: "2024-08-07",
          amount: 0.01,
          currency: "BTC",
          address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        },
        {
          id: 2,
          date: "2024-08-06",
          amount: 0.005,
          currency: "ETH",
          address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
        },
      ];
    },
    async handleSubmit() {
      if (!this.isValid) {
        return;
      }

      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        await this.fetchRateInfo();
        this.showSummary = true;
      } catch (err) {
        this.error = "An error occurred while processing your request.";
      } finally {
        this.loading = false;
      }
    },
    async confirmPayment() {
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Uncomment this for actual API call
        // await this.$axios.post('/crypto-payment/', {
        //   amount: this.cryptoAmount,
        //   address: this.cryptoAddress,
        //   currency: this.selectedCurrency,
        // });

        this.success = "Payment successful!";
        this.cryptoAmount = "";
        this.cryptoAddress = "";
        this.showSummary = false;
        this.fetchTransactionHistory();
      } catch (err) {
        this.error = "An error occurred during payment processing.";
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchTransactionHistory();
  },
};
</script>

<style scoped>
.payment-card,
.history-card {
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.summary-card {
  margin-top: 20px;
}

.v-text-field,
.v-btn {
  margin-bottom: 16px;
}

.v-alert {
  margin-top: 16px;
}

.loading-indicator {
  margin-top: 16px;
}
</style>
