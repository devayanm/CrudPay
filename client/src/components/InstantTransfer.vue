<template>
  <v-container>
    <v-card class="transfer-card">
      <v-card-title class="headline">Instant Transfer</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleSubmit" ref="transferForm">
          <!-- Transfer Fields -->
          <v-text-field
            v-model="recipientEmail"
            label="Recipient Email"
            required
            outlined
            dense
            :rules="emailRules"
            :counter="50"
            hint="e.g., user@example.com"
            persistent-hint
          ></v-text-field>
          <v-text-field
            v-model="amount"
            label="Amount"
            required
            outlined
            dense
            type="number"
            :rules="amountRules"
            :hint="amountHint"
            persistent-hint
          ></v-text-field>

          <!-- Rate Information -->
          <v-alert v-if="rateInfo" type="info">
            Current exchange rate: {{ rateInfo.rate }} {{ rateInfo.currency }}
          </v-alert>

          <!-- Transaction Summary -->
          <v-card v-if="showSummary" class="summary-card">
            <v-card-title>Transaction Summary</v-card-title>
            <v-card-text>
              <p><strong>Recipient:</strong> {{ recipientEmail }}</p>
              <p><strong>Amount:</strong> {{ amount }} {{ rateInfo?.currency }}</p>
              <p><strong>Fee:</strong> {{ fee }} {{ rateInfo?.currency }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="confirmTransfer" color="primary">Confirm</v-btn>
              <v-btn @click="showSummary = false" color="secondary">Cancel</v-btn>
            </v-card-actions>
          </v-card>

          <!-- Two-Factor Authentication -->
          <v-dialog v-model="show2FA" max-width="400px">
            <v-card>
              <v-card-title>Two-Factor Authentication</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="twoFACode"
                  label="Enter 2FA Code"
                  required
                  outlined
                ></v-text-field>
                <v-alert v-if="twoFAError" type="error">{{ twoFAError }}</v-alert>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="verify2FA" color="primary">Verify</v-btn>
                <v-btn @click="show2FA = false" color="secondary">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn type="submit" color="primary" :loading="loading" :disabled="loading || !isFormValid">
            Transfer
          </v-btn>
        </v-form>
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
            <v-list-item v-for="transaction in transactions" :key="transaction.id">
              <v-list-item-content>
                <v-list-item-title>{{ transaction.date }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ transaction.recipient }} - {{ transaction.amount }} {{ rateInfo?.currency }}
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
      recipientEmail: '',
      amount: '',
      error: null,
      success: null,
      loading: false,
      showSummary: false,
      show2FA: false,
      twoFACode: '',
      twoFAError: null,
      rateInfo: null,
      fee: 0,
      transactions: [], // Example data; replace with actual API data
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid',
      ],
      amountRules: [
        v => !!v || 'Amount is required',
        v => v > 0 || 'Amount must be greater than zero',
      ],
      amountHint: 'Enter the amount to be transferred',
    };
  },
  computed: {
    isFormValid() {
      return this.$refs.transferForm && this.$refs.transferForm.validate();
    },
  },
  methods: {
    async fetchRateInfo() {
      // Simulating rate fetching
      this.rateInfo = {
        rate: '1.25', // Example rate
        currency: 'USD',
      };
    },
    async fetchTransactionHistory() {
      // Simulate fetching transaction history
      this.transactions = [
        { id: 1, date: '2024-08-07', recipient: 'user1@example.com', amount: 100 },
        { id: 2, date: '2024-08-06', recipient: 'user2@example.com', amount: 50 },
      ];
    },
    async handleSubmit() {
      if (!this.isFormValid) {
        return;
      }

      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        await this.fetchRateInfo();
        this.fee = this.calculateFee(this.amount);
        this.showSummary = true;
      } catch (err) {
        this.error = 'An error occurred while processing your request.';
      } finally {
        this.loading = false;
      }
    },
    async confirmTransfer() {
      this.show2FA = true;
    },
    async verify2FA() {
      if (!this.twoFACode) {
        this.twoFAError = '2FA code is required.';
        return;
      }

      try {
        // Simulate 2FA verification
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Uncomment this for actual API call
        // await this.$axios.post('/verify-2fa/', { code: this.twoFACode });

        this.success = 'Transfer successful!';
        this.recipientEmail = '';
        this.amount = '';
        this.twoFACode = '';
        this.show2FA = false;
        this.showSummary = false;
        this.fetchTransactionHistory();
      } catch (err) {
        this.twoFAError = 'Invalid 2FA code. Please try again.';
      }
    },
    calculateFee(amount) {
      // Example fee calculation
      return (amount * 0.02).toFixed(2);
    },
  },
  mounted() {
    this.fetchTransactionHistory();
  },
};
</script>

<style scoped>
.transfer-card,
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
</style>
