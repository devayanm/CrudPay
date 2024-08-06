<template>
  <v-container fluid>
    <!-- Hero Section -->
    <v-row no-gutters>
      <v-col cols="12" class="hero-section">
        <v-card class="hero-card">
          <v-card-title class="headline white--text">
            <v-icon left>mdi-wallet-outline</v-icon>
            Welcome to CrudPay
          </v-card-title>
          <v-card-subtitle class="white--text">
            Your gateway to effortless cryptocurrency management and transactions.
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Main Content -->
    <v-row justify="center" align="center" class="main-content">
      <v-col cols="12" md="10" lg="8">
        <v-row dense>
          <!-- Dashboard Card -->
          <v-col cols="12" md="6" class="mb-4">
            <v-card class="pa-4 text-center dashboard-card" elevation="8">
              <v-icon large class="mb-2">mdi-view-dashboard</v-icon>
              <v-card-title>Dashboard</v-card-title>
              <v-card-subtitle class="mb-3">Overview of your transactions and balances.</v-card-subtitle>
              <v-btn color="primary" @click="goToDashboard" class="mt-2">View Dashboard</v-btn>
            </v-card>
          </v-col>

          <!-- Wallet Card -->
          <v-col cols="12" md="6" class="mb-4">
            <v-card class="pa-4 text-center wallet-card" elevation="8">
              <v-icon large class="mb-2">mdi-wallet-outline</v-icon>
              <v-card-title>Wallet</v-card-title>
              <v-card-subtitle class="mb-3">Manage your crypto assets and transactions.</v-card-subtitle>
              <v-btn color="secondary" @click="goToWallet" class="mt-2">Manage Wallet</v-btn>
            </v-card>
          </v-col>
        </v-row>

        <!-- Additional Info Card -->
        <v-row dense>
          <v-col cols="12" class="mb-4">
            <v-card class="pa-4 text-center additional-info-card" elevation="8">
              <v-icon large class="mb-2">mdi-cash-usd</v-icon>
              <v-card-title>Instant Transactions</v-card-title>
              <v-card-subtitle class="mb-3">Experience fast and secure transactions with our gateway.</v-card-subtitle>
              <v-btn color="success" @click="exploreMore" class="mt-2">Explore More Features</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    goToWallet() {
      this.$router.push('/wallet');
    },
    exploreMore() {
      this.$router.push('/features'); // Example route
    }
  }
};
</script>

<style scoped>
.hero-section {
  background: url('@/assets/hero-background.jpg') no-repeat center center;
  background-size: cover;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  margin-top: 30px;
  margin-bottom: 16px; 
}

.hero-card {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  text-align: center;
  padding: 20px 30px;
  border-radius: 10px;
  max-width: 600px;
}

.hero-card .v-card-title {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.hero-card .v-card-subtitle {
  font-size: 1.3rem;
}

/* .main-content {
  margin-top: 20px; 
  margin-bottom: 20px; 
} */

.dashboard-card, .wallet-card, .additional-info-card {
  transition: transform 0.3s, box-shadow 0.3s;
}

.dashboard-card:hover, .wallet-card:hover, .additional-info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.v-card-title {
  font-weight: bold;
  font-size: 1.6rem;
}

.v-card-subtitle {
  font-size: 1.1rem;
  color: #666;
}

.v-btn {
  font-weight: bold;
}

.primary--text {
  color: #1976d2 !important;
}

.white--text {
  color: #fff !important;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
