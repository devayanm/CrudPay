<template>
  <v-footer app color="#15181d" class="pa-4 footer-container">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="text-center text-md-left mb-4 mb-md-0">
          <h5 class="white--text">CrudPay</h5>
          <p class="grey--text text--lighten-1">
            Your gateway to effortless cryptocurrency management and
            transactions.
          </p>
          <v-icon class="social-icon">mdi-facebook</v-icon>
          <v-icon class="social-icon">mdi-twitter</v-icon>
          <v-icon class="social-icon">mdi-linkedin</v-icon>
        </v-col>
        <v-col cols="12" md="4" class="text-center mb-4 mb-md-0">
          <h5 class="white--text">Quick Links</h5>
          <v-btn text class="footer-btn" @click="goToHome">Home</v-btn>
          <v-btn text class="footer-btn" @click="goToFeatures">Features</v-btn>
          <v-btn text class="footer-btn" @click="goToSupport">Support</v-btn>
        </v-col>
        <v-col cols="12" md="4" class="text-center text-md-right">
          <img :src="logo" alt="CrudPay Logo" class="logo" />
          <h5 class="white--text">Contact Us</h5>
          <p class="grey--text text--lighten-1">support@crudpay.com</p>
          <p class="grey--text text--lighten-1">+123 456 7890</p>
        </v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col class="text-center white--text">
          <span>&copy; 2024 CrudPay. All rights reserved.</span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "AppFooter",
};
</script>

<style scoped>
.v-footer {
  background-color: #15181d;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.4);
  position: relative !important;
}

.footer-container {
  padding: 2rem 0;
}

.v-footer .text-center {
  padding: 1rem;
}

.footer-btn {
  color: #ffcc00 !important;
  background-color: transparent;
  text-transform: none;
  margin: 2px;
  transition: all 0.3s ease;
}

.footer-btn:hover {
  color: #e0e0e0 !important;
}

.v-divider {
  background-color: rgba(255, 255, 255, 0.2);
}

.social-icon {
  color: #ffcc00 !important;
  margin-right: 12px;
  transition: all 0.3s ease;
}

.social-icon:hover {
  color: #e0e0e0 !important;
}
</style>