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
          <v-btn color="primary" class="mt-4" @click="exploreMore">Explore Features</v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Main Content -->
    <v-row justify="center" align="center" class="main-content">
      <v-col cols="12" md="10" lg="8">
        <v-row dense>
          <!-- Dashboard Card -->
          <v-col cols="12" md="6" class="mb-4">
            <v-card class="pa-4 text-center dashboard-card" elevation="12">
              <v-icon large class="mb-2">mdi-view-dashboard</v-icon>
              <v-card-title>Dashboard</v-card-title>
              <v-card-subtitle class="mb-3">Overview of your transactions and balances.</v-card-subtitle>
              <v-btn color="primary" @click="goToDashboard" class="mt-2">View Dashboard</v-btn>
            </v-card>
          </v-col>

          <!-- Wallet Card -->
          <v-col cols="12" md="6" class="mb-4">
            <v-card class="pa-4 text-center wallet-card" elevation="12">
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
            <v-card class="pa-4 text-center additional-info-card" elevation="12">
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
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.hero-card {
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  text-align: center;
  padding: 30px;
  border-radius: 15px;
}

.hero-card .v-card-title {
  font-size: 3rem;
  font-weight: bold;
}

.hero-card .v-card-subtitle {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.dashboard-card, .wallet-card, .additional-info-card {
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 15px;
}

.dashboard-card:hover, .wallet-card:hover, .additional-info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
}

.v-card-title {
  font-weight: bold;
  font-size: 1.8rem;
}

.v-card-subtitle {
  font-size: 1.2rem;
  color: #666;
}

.v-btn {
  font-weight: bold;
  border-radius: 25px;
  padding: 10px 20px;
}

.primary--text {
  color: #1976d2 !important;
}

.white--text {
  color: #fff !important;
}

.mb-4 {
  margin-bottom: 20px;
}
</style>
