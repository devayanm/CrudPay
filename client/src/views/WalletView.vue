<template>
  <v-container>
    <NavigationButtons />
    <v-row>
      <!-- Wallet Overview Section -->
      <v-col cols="12" md="6">
        <v-card class="pa-5 wallet-card">
          <v-card-title class="headline d-flex align-center">
            <v-icon class="mr-2">mdi-wallet</v-icon> Wallet Overview
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Balance</v-list-item-title>
                  <v-list-item-subtitle class="balance-text">{{
                    formattedBalance
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Currency</v-list-item-title>
                  <v-list-item-subtitle>{{ currency }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-btn color="gradient" block @click="showAddFundsDialog"
              >Add Funds</v-btn
            >
            <v-btn color="error" block @click="showWithdrawFundsDialog"
              >Withdraw Funds</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Transaction History Section -->
      <v-col cols="12" md="6">
        <v-card class="pa-5 transaction-card">
          <v-card-title class="headline d-flex align-center">
            <v-icon class="mr-2">mdi-history</v-icon> Transaction History
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="transactions"
              item-key="id"
              class="elevation-1"
            >
              <template v-slot:[`item.date`]="{ item }">
                <v-chip small>{{ formatDate(item.date) }}</v-chip>
              </template>
              <template v-slot:[`item.amount`]="{ item }">
                <v-chip small :color="item.amount >= 0 ? 'green' : 'red'" dark>
                  {{ item.amount >= 0 ? `+${item.amount}` : item.amount }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Add Funds Dialog -->
    <v-dialog v-model="addFundsDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Add Funds</v-card-title>
        <v-card-text>
          <v-text-field
            label="Amount"
            v-model="addFundsAmount"
            type="number"
            :rules="[amountRules]"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="addFundsDialog = false">Cancel</v-btn>
          <v-btn color="primary" @click="addFunds">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Withdraw Funds Dialog -->
    <v-dialog v-model="withdrawFundsDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Withdraw Funds</v-card-title>
        <v-card-text>
          <v-text-field
            label="Amount"
            v-model="withdrawFundsAmount"
            type="number"
            :rules="[amountRules]"
            required
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="withdrawFundsDialog = false">Cancel</v-btn>
          <v-btn color="error" @click="withdrawFunds">Withdraw</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "WalletView",
  data() {
    return {
      balance: 1000.0, // Example balance, replace with actual data
      currency: "BTC", // Example currency, replace with actual data
      transactions: [
        { id: 1, date: "2024-08-01", amount: 100.0 },
        { id: 2, date: "2024-08-03", amount: -50.0 },
        // Add more transaction data
      ],
      headers: [
        { text: "Date", value: "date" },
        { text: "Amount", value: "amount" },
      ],
      addFundsDialog: false,
      withdrawFundsDialog: false,
      addFundsAmount: 0,
      withdrawFundsAmount: 0,
      amountRules: [
        (v) => !!v || "Amount is required",
        (v) => v > 0 || "Amount must be positive",
      ],
    };
  },
  computed: {
    formattedBalance() {
      return `${this.currency} ${this.balance.toFixed(2)}`;
    },
  },
  methods: {
    showAddFundsDialog() {
      this.addFundsDialog = true;
    },
    showWithdrawFundsDialog() {
      this.withdrawFundsDialog = true;
    },
    addFunds() {
      if (this.addFundsAmount > 0) {
        this.balance += parseFloat(this.addFundsAmount);
        this.transactions.push({
          id: this.transactions.length + 1,
          date: new Date().toISOString().slice(0, 10),
          amount: this.addFundsAmount,
        });
        this.addFundsAmount = 0;
        this.addFundsDialog = false;
      }
    },
    withdrawFunds() {
      if (
        this.withdrawFundsAmount > 0 &&
        this.withdrawFundsAmount <= this.balance
      ) {
        this.balance -= parseFloat(this.withdrawFundsAmount);
        this.transactions.push({
          id: this.transactions.length + 1,
          date: new Date().toISOString().slice(0, 10),
          amount: -this.withdrawFundsAmount,
        });
        this.withdrawFundsAmount = 0;
        this.withdrawFundsDialog = false;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}

.wallet-card,
.transaction-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  font-weight: bold;
  color: #2c3e50;
}

.balance-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #16a085;
}

.v-btn {
  margin-top: 10px;
}

.v-btn[color="gradient"] {
  background: linear-gradient(45deg, #42a5f5, #478ed1);
}

.v-btn[color="error"] {
  background-color: #e74c3c;
}

.v-chip {
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
