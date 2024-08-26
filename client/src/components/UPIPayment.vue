<template>
  <v-container>
    <v-card class="payment-card">
      <v-card-title class="headline">UPI Payment</v-card-title>
      <v-card-text>
        <v-form ref="upiForm" v-model="formValid" @submit.prevent="handleSubmit">
          <!-- Payment Fields -->
          <v-text-field
            v-model="upiId"
            label="UPI ID"
            required
            outlined
            dense
            :rules="upiRules"
          ></v-text-field>
          <v-text-field
            v-model="amount"
            label="Amount"
            required
            outlined
            dense
            type="number"
            :rules="amountRules"
          ></v-text-field>

          <!-- Payment Summary -->
          <v-card v-if="showSummary" class="summary-card">
            <v-card-title>Payment Summary</v-card-title>
            <v-card-text>
              <p>
                <strong>UPI ID:</strong> {{ upiId }}
              </p>
              <p><strong>Amount:</strong> {{ amount }}</p>
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
            :disabled="loading || !formValid"
          >
            Pay
          </v-btn>
        </v-form>

        <!-- Alerts -->
        <v-alert v-if="error" type="error">{{ error }}</v-alert>
        <v-alert v-if="success" type="success">{{ success }}</v-alert>
      </v-card-text>
    </v-card>

    <!-- Transaction History -->
    <v-card class="history-card">
      <v-card-title>Transaction History</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group v-if="transactions.length">
            <v-list-item
              v-for="transaction in transactions"
              :key="transaction.id"
            >
              <v-list-item-content>
                <v-list-item-title>{{ transaction.date }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ transaction.amount }} to {{ transaction.upi_id }} - Status: {{ transaction.status }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-alert v-if="!transactions.length" type="info">
            No recent transactions.
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
      upiId: '',
      amount: '',
      error: null,
      success: null,
      loading: false,
      showSummary: false,
      transactions: [], // Example data; replace with actual API data
      formValid: false,
      upiRules: [
        (v) => !!v || 'UPI ID is required',
        (v) => /^[a-zA-Z0-9._-]{3,50}$/.test(v) || 'Invalid UPI ID',
      ],
      amountRules: [
        (v) => !!v || 'Amount is required',
        (v) => v > 0 || 'Amount must be greater than zero',
      ],
    };
  },
  methods: {
    async fetchTransactionHistory() {
      // Simulate fetching transaction history
      this.transactions = [
        {
          id: 1,
          date: '2024-08-07',
          amount: '100.00',
          upi_id: 'example@upi',
          status: 'Success',
        },
        {
          id: 2,
          date: '2024-08-06',
          amount: '50.00',
          upi_id: 'test@upi',
          status: 'Failed',
        },
      ];
    },
    async handleSubmit() {
      this.$refs.upiForm.validate();
      if (!this.formValid) {
        return;
      }

      this.loading = true;
      this.error = null;
      this.success = null;
      this.showSummary = false;

      try {
        // Simulate UPI payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Uncomment this for actual API call
        // await this.$axios.post('/upi-payment/', {
        //   upi_id: this.upiId,
        //   amount: this.amount,
        // });

        this.success = 'Payment successful!';
        this.upiId = '';
        this.amount = '';
        this.fetchTransactionHistory();
      } catch (err) {
        this.error = 'An error occurred during payment processing.';
      } finally {
        this.loading = false;
      }
    },
    async confirmPayment() {
      this.showSummary = false;
      await this.handleSubmit();
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
