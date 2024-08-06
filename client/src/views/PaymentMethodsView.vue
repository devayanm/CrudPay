<template>
  <v-container fluid class="payment-methods-container">
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
        <v-card class="instructions-card">
          <v-card-title class="instructions-title">How to Use</v-card-title>
          <v-card-text>
            <p class="instructions-text">
              Click on the icons below to explore different payment methods.
              Each icon represents a unique payment option. Hover over the icons
              to see their names, and click to view more details in a modal.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Payment Methods Section -->
    <v-row class="d-flex justify-center mt-4 payment-methods">
      <v-col cols="12" class="text-center">
        <div class="icons-container">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="payment-icon"
                v-bind="attrs"
                v-on="on"
                @click="openModal('crypto')"
              >
                mdi-bitcoin
              </v-icon>
            </template>
            <span>Crypto Payment</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="payment-icon"
                v-bind="attrs"
                v-on="on"
                @click="openModal('upi')"
              >
                mdi-credit-card-multiple
              </v-icon>
            </template>
            <span>UPI Payment</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="payment-icon"
                v-bind="attrs"
                v-on="on"
                @click="openModal('qr')"
              >
                mdi-qrcode
              </v-icon>
            </template>
            <span>QR Code Management</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="payment-icon"
                v-bind="attrs"
                v-on="on"
                @click="openModal('instant')"
              >
                mdi-cash-multiple
              </v-icon>
            </template>
            <span>Instant Transfers</span>
          </v-tooltip>
        </div>
      </v-col>
    </v-row>

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

    <!-- Payment Overview Section -->
    <v-row class="d-flex justify-center mt-4">
      <v-col cols="12" lg="8">
        <v-card class="overview-card">
          <v-card-title class="overview-card-title"
            >Payment Overview</v-card-title
          >
          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="overview-subheading"
                    >Available Payment Methods</v-list-item-title
                  >
                  <v-list-item-subtitle
                    >Explore our range of payment options including Crypto
                    Payment and UPI Payment.</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="overview-subheading"
                    >Recent Transactions</v-list-item-title
                  >
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
    };
  },
  methods: {
    openModal(type) {
      this.modals[type] = true;
    },
  },
};
</script>

<style scoped>
.payment-methods-container {
  padding: 20px;
  background-color: #f5f5f5;
}

.hero-section {
  margin-bottom: 30px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: bold;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.instructions-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.instructions-text {
  font-size: 1rem;
  color: #555;
}

.payment-methods {
  margin-top: 30px;
}

.icons-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.payment-icon {
  font-size: 3rem;
  color: #fff;
  background-color: #1976D2;
  border-radius: 50%;
  padding: 15px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.payment-icon:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.modal-title {
  font-weight: bold;
  font-size: 1.5rem;
  color: #333;
}

.modal-slide-in-right {
  animation: slideInFromRight 0.5s ease-out;
}

.modal-slide-in-left {
  animation: slideInFromLeft 0.5s ease-out;
}

.modal-slide-in-center {
  animation: slideInFromCenter 0.5s ease-out;
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
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.overview-card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.overview-card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.overview-subheading {
  font-weight: bold;
  color: #555;
}

.transaction-chip {
  margin: 4px;
  font-size: 0.9rem;
}
</style>
