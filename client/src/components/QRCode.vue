<template>
  <v-container>
    <!-- QR Code Management Card -->
    <v-card class="pa-5">
      <v-card-title class="headline">QR Code Management</v-card-title>
      <v-card-text>
        <v-row>
          <!-- QR Code Generation Section -->
          <v-col cols="12" md="6">
            <v-card class="pa-4 mb-4" outlined>
              <v-card-title class="headline">Generate QR Code</v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="qrCodeData"
                  label="Enter Data for QR Code"
                  outlined
                  dense
                ></v-text-field>
                <v-btn @click="generateQRCode" color="primary" class="mt-2">Generate QR Code</v-btn>
                <v-img v-if="qrCodeImage" :src="qrCodeImage" class="mt-4" contain></v-img>
                <v-alert v-if="error" type="error" class="mt-2">{{ error }}</v-alert>
                <v-list v-if="qrCodeHistory.length" class="mt-4">
                  <v-list-item-group v-for="(item, index) in qrCodeHistory" :key="index">
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>QR Code {{ index + 1 }}</v-list-item-title>
                        <v-list-item-subtitle>
                          <v-img :src="item" class="mt-2" contain></v-img>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- QR Code Scanning Section -->
          <v-col cols="12" md="6">
            <v-card class="pa-4 mb-4" outlined>
              <v-card-title class="headline">Scan QR Code</v-card-title>
              <v-card-text>
                <v-btn @click="openScanner" color="primary">Open Scanner</v-btn>
                <v-dialog v-model="scannerDialog" max-width="600px">
                  <v-card>
                    <v-card-title class="headline">QR Code Scanner</v-card-title>
                    <v-card-text>
                      <div ref="scannerContainer" class="scanner-container"></div>
                      <v-alert v-if="scanError" type="error" class="mt-2">{{ scanError }}</v-alert>
                      <v-progress-circular
                        v-if="scanning"
                        indeterminate
                        color="primary"
                        class="mt-4"
                      ></v-progress-circular>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn text @click="closeScanner">Close</v-btn>
                      <v-btn text @click="toggleCamera" v-if="scanner" color="secondary">Switch Camera</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import QRCode from 'qrcode';
import { Html5Qrcode } from "html5-qrcode";

export default {
  data() {
    return {
      qrCodeData: '',
      qrCodeImage: null,
      error: null,
      scannerDialog: false,
      scanError: null,
      scanning: false,
      scanner: null,
      qrCodeHistory: [], // New array to keep track of QR codes
      cameraFacingMode: "environment" // Default camera mode
    };
  },
  methods: {
    async generateQRCode() {
      try {
        const qrCode = await QRCode.toDataURL(this.qrCodeData);
        this.qrCodeImage = qrCode;
        this.qrCodeHistory.unshift(qrCode); // Add to history
        this.error = null;
      } catch (err) {
        this.error = 'Failed to generate QR code.';
        this.qrCodeImage = null;
      }
    },
    openScanner() {
      this.scannerDialog = true;
      this.$nextTick(() => {
        this.initializeScanner();
      });
    },
    closeScanner() {
      if (this.scanner) {
        this.scanner.stop().catch(error => console.error('Failed to stop the scanner:', error));
      }
      this.scannerDialog = false;
      this.scanning = false;
    },
    initializeScanner() {
      if (!this.$refs.scannerContainer) {
        console.error('Scanner container element not found.');
        return;
      }

      const qrCodeSuccessCallback = (decodedText) => {
        this.closeScanner();
        alert(`QR Code Scanned: ${decodedText}`);
      };

      const qrCodeErrorCallback = (errorMessage) => {
        this.scanError = 'Failed to scan QR code.';
        console.error('QR Code error:', errorMessage);
      };

      const html5QrCode = new Html5Qrcode(this.$refs.scannerContainer);
      this.scanner = html5QrCode;

      html5QrCode.start(
        { facingMode: this.cameraFacingMode },
        { fps: 10, qrbox: 250 },
        qrCodeSuccessCallback,
        qrCodeErrorCallback
      ).then(() => {
        this.scanning = true;
      }).catch(error => {
        console.error('Failed to start the scanner:', error);
        this.scanError = 'Failed to start QR code scanner.';
      });
    },
    toggleCamera() {
      this.cameraFacingMode = this.cameraFacingMode === "environment" ? "user" : "environment";
      if (this.scanner) {
        this.closeScanner();
        this.openScanner();
      }
    }
  },
};
</script>

<style scoped>
.pa-5 {
  padding: 20px;
}

.v-img {
  max-width: 100%;
  border-radius: 8px;
}

.scanner-container {
  width: 100%;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.v-dialog .v-card {
  overflow: hidden;
}

.v-progress-circular {
  display: block;
  margin: 0 auto;
}
</style>
