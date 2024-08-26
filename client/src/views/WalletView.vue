<template>
  <v-container>
    <NavigationButtons />
    <v-row>
      <!-- Wallet Overview Section -->
      <v-col cols="12" md="6">
        <v-card class="pa-5 wallet-card elevation-12">
          <v-card-title class="headline d-flex align-center">
            <v-icon class="mr-2">mdi-wallet</v-icon>
            Wallet Overview
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Balance</v-list-item-title>
                  <v-list-item-subtitle class="balance-text">
                    {{ formattedBalance }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Currency</v-list-item-title>
                  <v-list-item-subtitle>{{ currency }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-btn class="wallet-btn gradient-btn" block @click="showAddFundsDialog"
              v-tooltip.bottom="'Add funds to your wallet'">
              Add Funds
            </v-btn>
            <v-btn class="wallet-btn withdraw-btn" block @click="showWithdrawFundsDialog"
              v-tooltip.bottom="'Withdraw funds from your wallet'">
              Withdraw Funds
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Transaction History Section -->
      <v-col cols="12" md="6">
        <v-card class="pa-5 transaction-card elevation-12">
          <v-card-title class="headline d-flex align-center">
            <v-icon class="mr-2">mdi-history</v-icon>
            Transaction History
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="transactions" item-key="id" class="elevation-2" :items-per-page="5"
              :footer-props="{ 'items-per-page-options': [5, 10, 15] }">
              <template v-slot:[`item.date`]="{ item }">
                <v-chip small class="date-chip">
                  {{ formatDate(item.date) }}
                </v-chip>
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
          <v-text-field label="Amount" v-model="addFundsAmount" type="number" :rules="[amountRules]"
            required></v-text-field>
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
          <v-text-field label="Amount" v-model="withdrawFundsAmount" type="number" :rules="[amountRules]"
            required></v-text-field>
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
      balance: 1000.0,
      currency: "BTC",
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
  background: linear-gradient(135deg, #1e2a38, #2d3e50);
  color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border: 1px solid #2d3e50;
}

.wallet-card {
  margin-bottom: 20px;
}

.v-card-title {
  font-weight: bold;
  color: #dfe6e9;
}

.balance-text {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1abc9c;
  padding: 12px 0;
  line-height: 1.3;
  display: flex;
  align-items: center;
}

.v-btn.wallet-btn {
  margin-top: 10px;
  text-transform: none;
  font-weight: bold;
  border-radius: 25px;
  padding: 12px 24px;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.v-btn.wallet-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-btn.gradient-btn {
  background: linear-gradient(45deg, #1e88e5, #0d47a1);
  color: #ffffff;
}

.v-btn.withdraw-btn {
  background-color: #d32f2f;
  color: #ffffff;
}

.v-chip.date-chip {
  background-color: #344952;
  color: #ffffff;
}

.v-data-table .v-chip {
  font-size: 0.9rem;
  font-weight: bold;
}

.v-data-table .v-chip.green {
  background-color: #388e3c;
}

.v-data-table .v-chip.red {
  background-color: #d32f2f;
}
</style>
