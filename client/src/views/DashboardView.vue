<template>
  <v-container>
    <NavigationButtons />

    <v-row>
      <!-- Account Overview -->
      <v-col cols="12" md="4">
        <v-card class="pa-5 account-overview-card">
          <v-card-title class="headline">Account Overview</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Email</v-list-item-title>
                  <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Balance</v-list-item-title>
                  <v-list-item-subtitle>{{
                    formattedBalance
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Last Login</v-list-item-title>
                  <v-list-item-subtitle>{{
                    formattedLastLoginDate
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Quick Links -->
      <v-col cols="12" md="8">
        <v-card class="pa-5 quick-links-card">
          <v-card-title class="headline">Quick Links</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-btn color="primary" block @click="navigateTo('wallet')"
                  >Go to Wallet</v-btn
                >
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                  color="secondary"
                  block
                  @click="navigateTo('payment-integration')"
                  >Payment Integration</v-btn
                >
              </v-col>
              <v-col cols="12" md="6">
                <v-btn
                  color="success"
                  block
                  @click="navigateTo('convert-crypto')"
                  >Convert Crypto</v-btn
                >
              </v-col>
              <v-col cols="12" md="6">
                <v-btn color="info" block @click="navigateTo('settings')"
                  >Account Settings</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <!-- Recent Transactions -->
      <v-col cols="12">
        <v-card class="pa-5 recent-transactions-card">
          <v-card-title class="headline">Recent Transactions</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item
                v-for="transaction in recentTransactions"
                :key="transaction.id"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ transaction.type }}</v-list-item-title>
                  <v-list-item-subtitle
                    >{{ transaction.date }} -
                    {{
                      formattedAmount(transaction.amount)
                    }}</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon
                    :color="transaction.type === 'Credit' ? 'success' : 'error'"
                    >{{
                      transaction.type === "Credit"
                        ? "mdi-arrow-up-bold-circle"
                        : "mdi-arrow-down-bold-circle"
                    }}</v-icon
                  >
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
        <v-card class="pa-5 notifications-card">
          <v-card-title class="headline">Notifications</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item
                v-for="notification in notifications"
                :key="notification.id"
              >
                <v-list-item-content>
                  <v-list-item-title>{{
                    notification.title
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    notification.message
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Security Settings -->
      <v-col cols="12" md="6">
        <v-card class="pa-5 security-settings-card">
          <v-card-title class="headline">Security Settings</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Two-Factor Authentication</v-list-item-title
                  >
                  <v-switch
                    v-model="twoFactorAuthEnabled"
                    class="ml-2"
                  ></v-switch>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Change Password</v-list-item-title>
                  <v-btn
                    text
                    @click="navigateTo('change-password')"
                    class="ml-2"
                    >Change</v-btn
                  >
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
  background-color: #f5f5f5;
  border-radius: 8px;
}

.v-card-title {
  font-weight: bold;
}

.v-btn {
  margin-top: 10px;
}

.account-overview-card {
  background-color: #f8f9fa;
}

.quick-links-card {
  background-color: #e9ecef;
}

.recent-transactions-card {
  background-color: #f8f9fa;
}

.notifications-card {
  background-color: #f1f3f5;
}

.security-settings-card {
  background-color: #e9ecef;
}

.v-list-item-content {
  padding: 0;
}

.v-list-item-icon {
  min-width: 40px;
}

.v-list-item-title {
  font-weight: 500;
}
</style>
