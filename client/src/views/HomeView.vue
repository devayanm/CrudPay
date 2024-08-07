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
            Your gateway to effortless cryptocurrency management and
            transactions.
          </v-card-subtitle>
          <v-btn color="primary" class="mt-4" @click="exploreMore"
            >Explore Features</v-btn
          >
        </v-card>
      </v-col>
    </v-row>

    <!-- Main Content -->
    <v-row justify="center" align="center" class="main-content">
      <v-col cols="12" md="10" lg="8">
        <v-row dense>
          <!-- Dashboard Card -->
          <v-col cols="12" sm="6" class="mb-4">
            <v-card class="pa-4 text-center dashboard-card" elevation="16">
              <v-icon large class="mb-2">mdi-view-dashboard</v-icon>
              <v-card-title>Dashboard</v-card-title>
              <v-card-subtitle class="mb-3"
                >Overview of your transactions and balances.</v-card-subtitle
              >
              <v-btn color="green" @click="goToDashboard" class="mt-2"
                >View Dashboard</v-btn
              >
            </v-card>
          </v-col>

          <!-- Wallet Card -->
          <v-col cols="12" sm="6" class="mb-4">
            <v-card class="pa-4 text-center wallet-card" elevation="16">
              <v-icon large class="mb-2">mdi-wallet-outline</v-icon>
              <v-card-title>Wallet</v-card-title>
              <v-card-subtitle class="mb-3"
                >Manage your crypto assets and transactions.</v-card-subtitle
              >
              <v-btn color="amber" @click="goToWallet" class="mt-2"
                >Manage Wallet</v-btn
              >
            </v-card>
          </v-col>
        </v-row>

        <!-- Payment Methods Card -->
        <v-row dense>
          <v-col cols="12" class="mb-4">
            <v-card
              class="pa-4 text-center payment-methods-card"
              elevation="16"
            >
              <v-icon large class="mb-2">mdi-cash-usd</v-icon>
              <v-card-title class="headline">Payment Methods</v-card-title>
              <v-card-subtitle class="mb-3"
                >Explore and manage your payment options.</v-card-subtitle
              >
              <v-btn
                color="teal"
                @click="goToPaymentMethods"
                class="mt-2"
                large
              >
                Manage Payment Methods
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <!-- Additional Info Card -->
        <v-row dense>
          <v-col cols="12" class="mb-4">
            <v-card
              class="pa-4 text-center additional-info-card"
              elevation="16"
            >
              <v-icon large class="mb-2">mdi-cash-usd</v-icon>
              <v-card-title>Instant Transactions</v-card-title>
              <v-card-subtitle class="mb-3"
                >Experience fast and secure transactions with our
                gateway.</v-card-subtitle
              >
              <v-btn color="blue-grey" @click="exploreMore" class="mt-2"
                >Explore More Features</v-btn
              >
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    goToDashboard() {
      this.$router.push("/dashboard");
    },
    goToWallet() {
      this.$router.push("/wallet");
    },
    goToPaymentMethods() {
      this.$router.push("/payment-methods");
    },
    exploreMore() {
      this.$router.push("/features");
    },
  },
};
</script>

<style scoped>
.hero-section {
  background: url("@/assets/hero-background.jpg") no-repeat center center;
  background-size: cover;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 20px;
}

.hero-card {
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  text-align: center;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

.hero-card .v-card-title {
  font-weight: bold;
  font-size: 2rem;
}

.hero-card .v-card-subtitle {
  margin-bottom: 15px;
  font-size: 1rem;
}

.dashboard-card,
.wallet-card,
.payment-methods-card,
.additional-info-card {
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 15px;
}

.dashboard-card:hover,
.wallet-card:hover,
.payment-methods-card:hover,
.additional-info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
}

.v-card-title {
  font-weight: bold;
  color: #333;
  font-size: 1.2rem;
}

.v-card-subtitle {
  color: #666;
  font-size: 0.9rem;
}

.v-btn {
  font-weight: bold;
  border-radius: 25px;
  padding: 8px 16px;
  text-transform: uppercase;
  font-size: 0.875rem;
}

.primary--text {
  color: #1976d2 !important;
}

.secondary--text {
  color: #9c27b0 !important;
}

.teal {
  background-color: #008080 !important;
}

.white--text {
  color: #fff !important;
}

.mb-4 {
  margin-bottom: 20px;
}

/* Breakpoints for Responsiveness */

@media (max-width: 1400px) {
  .hero-section {
    height: 400px;
  }

  .hero-card {
    padding: 18px;
  }

  .hero-card .v-card-title {
    font-size: 1.8rem;
  }

  .hero-card .v-card-subtitle {
    font-size: 0.9rem;
  }
}

@media (max-width: 1200px) {
  .hero-section {
    height: 400px;
  }
  
  .hero-card {
    padding: 15px;
  }

  .hero-card .v-card-title {
    font-size: 1.6rem;
  }

  .hero-card .v-card-subtitle {
    font-size: 0.85rem;
  }
}

@media (max-width: 992px) {
  .hero-section {
    height: 300px;
  }

  .hero-card {
    padding: 12px;
  }

  .hero-card .v-card-title {
    font-size: 1.4rem;
  }

  .hero-card .v-card-subtitle {
    font-size: 0.8rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 300px;
  }

  .hero-card {
    padding: 10px;
    height: auto;
  }

  .hero-card .v-card-title {
    font-size: 1.2rem;
  }

  .hero-card .v-card-subtitle {
    font-size: 0.75rem;
  }

  .v-card-title {
    font-size: 1rem;
  }

  .v-card-subtitle {
    font-size: 0.8rem;
  }
}

@media (max-width: 600px) {
  .hero-section {
    height: 200px;
  }

  .hero-card {
    padding: 8px;
  }

  .hero-card .v-card-title {
    font-size: 1rem;
  }

  .hero-card .v-card-subtitle {
    font-size: 0.7rem;
  }

  .v-card-title {
    font-size: 0.9rem;
  }

  .v-card-subtitle {
    font-size: 0.7rem;
  }

  .v-btn {
    font-size: 0.75rem;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 200px;
  }

  .hero-card {
    padding: 6px;
  }

  .hero-card .v-card-title {
    font-size: 0.9rem;
  }

  .hero-card .v-card-subtitle {
    font-size: 0.6rem;
  }

  .v-card-title {
    font-size: 0.8rem;
  }

  .v-card-subtitle {
    font-size: 0.6rem;
  }

  .v-btn {
    font-size: 0.7rem;
    padding: 4px 8px;
  }
}

@media (max-width: 360px) {
  .hero-section {
    height: 150px;
  }

  .hero-card {
    padding: 4px;
  }

  .hero-card .v-card-title {
    font-size: 0.8rem;
  }

  .hero-card .v-card-subtitle {
    font-size: 0.55rem;
  }

  .v-card-title {
    font-size: 0.7rem;
  }

  .v-card-subtitle {
    font-size: 0.55rem;
  }

  .v-btn {
    font-size: 0.65rem;
    padding: 2px 6px;
  }
}

@media (max-width: 320px) {
  .hero-section {
    height: 150px;
  }

  .hero-card {
    padding: 2px;
  }

  .hero-card .v-card-title {
    font-size: 0.7rem;
  }

  .hero-card .v-card-subtitle {
    font-size: 0.5rem;
  }

  .v-card-title {
    font-size: 0.6rem;
  }

  .v-card-subtitle {
    font-size: 0.5rem;
  }

  .v-btn {
    font-size: 0.6rem;
    padding: 2px 4px;
  }
}
</style>
