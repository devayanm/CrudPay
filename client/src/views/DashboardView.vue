<template>
  <v-container>
    <NavigationButtons />

    <v-row>
      <!-- Account Overview -->
      <v-col cols="12" md="4">
        <v-card class="pa-5 account-overview-card elevation-8">
          <v-card-title class="headline">Account Overview</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle class="subtitle">{{ user.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Balance</v-list-item-title>
                  <v-list-item-subtitle class="balance-text">{{ formattedBalance }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Last Login</v-list-item-title>
                  <v-list-item-subtitle class="subtitle">{{ formattedLastLoginDate }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Quick Links -->
      <v-col cols="12" md="8">
        <v-card class="pa-5 quick-links-card elevation-8">
          <v-card-title class="headline">Quick Links</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-btn color="primary" block @click="navigateTo('wallet')">Go to Wallet</v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="secondary" block @click="navigateTo('payment-integration')">Payment Integration</v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="success" block @click="navigateTo('convert-crypto')">Convert Crypto</v-btn>
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="info" block @click="navigateTo('settings')">Account Settings</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Recent Transactions -->
      <v-col cols="12">
        <v-card class="pa-5 recent-transactions-card elevation-8">
          <v-card-title class="headline">Recent Transactions</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item
                v-for="transaction in recentTransactions"
                :key="transaction.id"
                class="transaction-list-item"
              >
                <v-list-item-content>
                  <v-list-item-title class="transaction-title">{{ transaction.type }}</v-list-item-title>
                  <v-list-item-subtitle>{{ transaction.date }} - {{ formattedAmount(transaction.amount) }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon :color="transaction.type === 'Credit' ? 'success' : 'error'">
                    {{
                      transaction.type === "Credit"
                        ? "mdi-arrow-up-bold-circle"
                        : "mdi-arrow-down-bold-circle"
                    }}
                  </v-icon>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Notifications -->
      <v-col cols="12" md="6">
        <v-card class="pa-5 notifications-card elevation-8">
          <v-card-title class="headline">Notifications</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item
                v-for="notification in notifications"
                :key="notification.id"
                class="notification-list-item"
              >
                <v-list-item-content>
                  <v-list-item-title class="notification-title">{{ notification.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{ notification.message }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Security Settings -->
      <v-col cols="12" md="6">
        <v-card class="pa-5 security-settings-card elevation-8">
          <v-card-title class="headline">Security Settings</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Two-Factor Authentication</v-list-item-title>
                  <v-switch v-model="twoFactorAuthEnabled" class="ml-2"></v-switch>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Change Password</v-list-item-title>
                  <v-btn text @click="navigateTo('change-password')" class="ml-2">Change</v-btn>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "DashboardView",
  data() {
    return {
      user: {
        email: "user@example.com", // Example user data, replace with actual data
      },
      balance: 12345.67, // Example balance, replace with actual data
      lastLoginDate: "2024-08-06T12:34:56Z", // Example last login date, replace with actual data
      recentTransactions: [
        { id: 1, type: "Debit", date: "2024-08-01", amount: -250.75 },
        { id: 2, type: "Credit", date: "2024-07-28", amount: 1200.0 },
        { id: 3, type: "Debit", date: "2024-07-25", amount: -75.5 },
      ],
      notifications: [
        {
          id: 1,
          title: "New Feature",
          message: "Check out our new crypto conversion feature!",
        },
        {
          id: 2,
          title: "Security Update",
          message: "Two-factor authentication is now available.",
        },
      ],
      twoFactorAuthEnabled: false,
    };
  },
  computed: {
    formattedBalance() {
      return `$${this.balance.toFixed(2)}`;
    },
    formattedLastLoginDate() {
      return new Date(this.lastLoginDate).toLocaleString();
    },
  },
  methods: {
    formattedAmount(amount) {
      return `$${Math.abs(amount).toFixed(2)}`;
    },
    navigateTo(route) {
      this.$router.push(`/${route}`);
    },
  },
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}

.v-card {
  background: rgba(0, 0, 0, 0.6) !important;
  border-radius: 12px;
  color: #ffffff !important;
}

.v-card-title {
  font-weight: bold;
  color: #ffffff;
}

.account-overview-card {
  background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.quick-links-card {
  background: rgba(0, 0, 0, 0.6);  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.recent-transactions-card {
  background: rgba(0, 0, 0, 0.6);  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.notifications-card {
  background: rgba(0, 0, 0, 0.6);  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.security-settings-card {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.balance-text {
  font-size: 1.6rem;
  font-weight: bold;
  color: #2d3e50;
  line-height: 1.2; 
  padding: 8px 0; 
}

.subtitle {
  color: #666;
}

.transaction-list-item {
  border-bottom: 1px solid #ddd;
}

.transaction-title {
  font-weight: bold;
}

.notification-list-item {
  border-bottom: 1px solid #ddd;
}

.notification-title {
  font-weight: bold;
}

.v-btn {
  text-transform: none;
}
</style>
