<template>
  <v-container fluid class="payment-methods-container">
    <NavigationButtons />
    <!-- Hero Section -->
    <v-row class="d-flex align-center justify-center hero-section">
      <v-col cols="12" class="text-center">
        <h1 class="hero-title">Explore Payment Methods</h1>
        <p class="hero-subtitle">
          Choose from various payment options tailored to your needs.
        </p>
      </v-col>
    </v-row>

    <!-- Instructions Section -->
    <v-row class="d-flex justify-center instructions-section">
      <v-col cols="12" md="8" class="text-center">
        <v-btn icon @click="instructionsDialog = true" color="primary">
          <v-icon>mdi-information</v-icon>
        </v-btn>
        <v-dialog v-model="instructionsDialog" max-width="600px">
          <v-card>
            <v-card-title class="instructions-title"> How to Use </v-card-title>
            <v-card-text>
              <p class="instructions-text">
                Click on the icons below to explore different payment methods.
                Each icon represents a unique payment option. Hover over the
                icons to see their names, and click to view more details in a
                modal.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" text @click="instructionsDialog = false"
                >Close</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <!-- Search Bar -->
    <v-row class="d-flex justify-center mt-4">
      <v-col cols="12" md="8" class="text-center">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search Payment Methods"
          single-line
          hide-details
          class="search-bar"
        ></v-text-field>
      </v-col>
    </v-row>

    <!-- Payment Methods Section -->
    <v-row class="d-flex justify-center mt-4 payment-methods">
      <v-col cols="8" class="text-center">
        <v-row dense>
          <v-col
            cols="8"
            sm="6"
            md="3"
            v-for="method in filteredMethods"
            :key="method.name"
            class="mb-2"
          >
            <v-card class="payment-card" @click="openModal(method.type)">
              <v-icon :color="method.color" class="payment-icon">{{
                method.icon
              }}</v-icon>
              <v-card-title class="payment-card-title">{{
                method.name
              }}</v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Detailed Information Section -->
    <v-row class="d-flex justify-center mt-4">
      <v-col cols="12" lg="8">
        <v-card class="overview-card">
          <v-card-title class="overview-card-title">
            Payment Overview
          </v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="overview-subheading">
                    Available Payment Methods
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Explore our range of payment options including Crypto
                    Payment and UPI Payment.
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="overview-subheading">
                    Recent Transactions
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip
                      class="transaction-chip"
                      color="primary"
                      text-color="white"
                      >Transaction 1</v-chip
                    >
                    <v-chip
                      class="transaction-chip"
                      color="secondary"
                      text-color="white"
                      >Transaction 2</v-chip
                    >
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Notification System -->
    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      top
      right
      :color="snackbarColor"
      :style="{ zIndex: 1000 }"
    >
      {{ snackbarText }}
      <v-btn text @click="snackbar = false" class="snackbar-close-btn">
        Close
      </v-btn>
    </v-snackbar>

    <!-- Modals -->
    <v-dialog
      v-model="modals.crypto"
      max-width="600px"
      class="modal-slide-in-right"
    >
      <v-card>
        <v-card-title class="modal-title">Crypto Payment</v-card-title>
        <v-card-text>
          <CryptoPayment />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="modals.upi"
      max-width="600px"
      class="modal-slide-in-left"
    >
      <v-card>
        <v-card-title class="modal-title">UPI Payment</v-card-title>
        <v-card-text>
          <UPIPayment />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="modals.qr"
      max-width="600px"
      class="modal-slide-in-center"
    >
      <v-card>
        <v-card-title class="modal-title">QR Code Management</v-card-title>
        <v-card-text>
          <QRCode />
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="modals.instant"
      max-width="600px"
      class="modal-slide-in-center"
    >
      <v-card>
        <v-card-title class="modal-title">Instant Transfers</v-card-title>
        <v-card-text>
          <InstantTransfer />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import CryptoPayment from "@/components/CryptoPayment.vue";
import UPIPayment from "@/components/UPIPayment.vue";
import QRCode from "@/components/QRCode.vue";
import InstantTransfer from "@/components/InstantTransfer.vue";

export default {
  name: "PaymentMethodsView",
  components: {
    CryptoPayment,
    UPIPayment,
    QRCode,
    InstantTransfer,
  },
  data() {
    return {
      modals: {
        crypto: false,
        upi: false,
        qr: false,
        instant: false,
      },
      instructionsDialog: false,
      snackbar: false,
      snackbarText: "",
      snackbarTimeout: 3000,
      snackbarColor: "success",
      search: "",
      paymentMethods: [
        {
          name: "Crypto Payment",
          type: "crypto",
          icon: "mdi-currency-btc",
          color: "orange",
        },
        { name: "UPI Payment", type: "upi", icon: "mdi-cash", color: "green" },
        {
          name: "QR Code Management",
          type: "qr",
          icon: "mdi-qrcode",
          color: "blue",
        },
        {
          name: "Instant Transfers",
          type: "instant",
          icon: "mdi-bank-transfer",
          color: "purple",
        },
      ],
    };
  },
  computed: {
    filteredMethods() {
      if (this.search) {
        return this.paymentMethods.filter((method) =>
          method.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      return this.paymentMethods;
    },
  },
  methods: {
    openModal(type) {
      this.modals[type] = true;
      this.showSnackbar(`Opened ${type} payment method.`);
    },
    showSnackbar(text, color = "success") {
      this.snackbarText = text;
      this.snackbarColor = color;
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.payment-methods-container {
  padding: 20px;
  background-color: #f9fafc;
  color: #333;
}

.hero-section {
  margin-bottom: 40px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #7f8c8d;
}

.instructions-section {
  margin-bottom: 30px;
}

.search-bar {
  max-width: 600px;
  margin: 0 auto;
}

.snackbar-close-btn {
  color: black;
}

.payment-methods {
  margin-top: 40px;
}

.payment-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px;
  min-height: 140px;
  max-width: 140px;
  margin: 0 auto;
}

.payment-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.payment-icon {
  width: 60px;
  height: 60px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
}

.payment-card-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-top: 10px;
}

.modal-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #2c3e50;
}

.modal-slide-in-right {
  animation: slideInFromRight 0.5s ease forwards;
}

.modal-slide-in-left {
  animation: slideInFromLeft 0.5s ease forwards;
}

.modal-slide-in-center {
  animation: slideInFromCenter 0.5s ease forwards;
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideInFromCenter {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.overview-card {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-top: 40px;
}

.overview-card-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
}

.overview-subheading {
  font-size: 1.2rem;
  font-weight: 500;
  color: #2c3e50;
}

.transaction-chip {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
