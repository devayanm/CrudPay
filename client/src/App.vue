<template>
  <v-app>
    <!-- Preloader -->
    <PreLoader v-if="isLoading" />

    <!-- App Bar -->
    <v-app-bar app color="rgba(30, 30, 30, 0.8)" dark elevate-on-scroll>
      <v-toolbar-title
        @click="goToHome"
        class="cursor-pointer d-flex align-center"
      >
        <v-icon large class="mr-2">mdi-currency-btc</v-icon>
        CrudPay
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text class="app-bar-btn" @click="goToHome">Home</v-btn>
      <v-btn text class="app-bar-btn" @click="goToFeatures">Features</v-btn>
      <v-btn text class="app-bar-btn" @click="goToSupport">Support</v-btn>
      <v-menu v-model="menu" offset-y :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" class="app-bar-btn">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="goToProfile">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToLogin">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
          <v-list-item @click="goToRegister">
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-0 ma-0">
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer app color="rgba(26, 26, 26, 0.9)" class="pa-4 footer-container">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" class="text-center text-md-left mb-4 mb-md-0">
            <h5 class="white--text">CrudPay</h5>
            <p class="grey--text">
              Your gateway to effortless cryptocurrency management and
              transactions.
            </p>
            <v-icon class="white--text mr-2">mdi-facebook</v-icon>
            <v-icon class="white--text mr-2">mdi-twitter</v-icon>
            <v-icon class="white--text">mdi-linkedin</v-icon>
          </v-col>
          <v-col cols="12" md="4" class="text-center mb-4 mb-md-0">
            <h5 class="white--text">Quick Links</h5>
            <v-btn text class="footer-btn" @click="goToHome">Home</v-btn>
            <v-btn text class="footer-btn" @click="goToFeatures"
              >Features</v-btn
            >
            <v-btn text class="footer-btn" @click="goToSupport">Support</v-btn>
          </v-col>
          <v-col cols="12" md="4" class="text-center text-md-right">
            <h5 class="white--text">Contact Us</h5>
            <p class="grey--text">support@crudpay.com</p>
            <p class="grey--text">+123 456 7890</p>
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
  </v-app>
</template>

<script>
import PreLoader from "./components/PreLoader.vue";

export default {
  name: "App",
  components: {
    PreLoader
  },
  data() {
    return {
      isLoading: true,
      menu: false,
    };
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
    goToFeatures() {
      this.$router.push("/features");
    },
    goToSupport() {
      this.$router.push("/support");
    },
    goToProfile() {
      this.$router.push("/Profile");
    },
    goToLogin() {
      this.$router.push("/login");
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

.v-app-bar {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.v-toolbar-title {
  font-weight: 600;
  font-size: 1.8rem;
  color: #e0e0e0;
}

.app-bar-btn {
  color: #e0e0e0 !important;
  font-weight: 500;
  text-transform: none;
}

.app-bar-btn:hover {
  color: #b0bec5 !important;
}

.v-footer {
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.3);
  background-color: rgba(26, 26, 26, 0.9);
  position: relative !important;
}

.footer-container {
  padding: 2rem 0;
}

.v-footer .text-center {
  padding: 1rem;
  color: #e0e0e0;
}

.footer-btn {
  color: #232b2b !important;
  text-transform: none;
  margin: 2px;
}

.footer-btn:hover {
  color: #b0bec5 !important;
}

.v-divider {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
