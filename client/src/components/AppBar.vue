<template>
    <v-app-bar app color="transparent" dark elevate-on-scroll>
      <v-container>
        <v-row align="center" justify="space-between" class="app-bar-row">
          <!-- Logo and Title -->
          <div class="logo-box cursor-pointer d-flex align-center" @click="goToHome">
            <img :src="logo" alt="CrudPay Logo" class="logo" />
            <span class="crudpay-title">CrudPay</span>
          </div>
  
          <!-- Navbar Buttons -->
          <div class="nav-buttons d-flex align-center">
            <v-btn class="app-bar-btn" @click="goToHome">Home</v-btn>
            <v-btn class="app-bar-btn" @click="goToFeatures">Features</v-btn>
            <v-btn class="app-bar-btn" @click="goToSupport">Support</v-btn>
  
            <!-- Account Menu -->
            <v-menu v-model="menu" offset-y :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props" class="app-bar-btn account-btn">
                  <v-icon class="account-icon">mdi-account-circle</v-icon>
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
          </div>
        </v-row>
      </v-container>
    </v-app-bar>
  </template>
  
  <script>
  import logo from "@/assets/logo.png";
  
  export default {
    name: "AppBar",
    data() {
      return {
        menu: false,
        logo,
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
        this.$router.push("/profile");
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
  
  <style scoped>
  /* Styles for AppBar */
  .app-bar-row {
    padding: 0 20px;
  }
  
  .logo-box {
    display: flex;
    align-items: center;
  }
  
  .logo {
    height: 50px;
    margin-right: 10px;
  }
  
  .crudpay-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffcc00;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  }
  
  .nav-buttons {
    gap: 20px;
  }
  
  .app-bar-btn {
    background: linear-gradient(145deg, #2b2f34, #181b20);
    color: #e0e0e0 !important;
    font-weight: 500;
    text-transform: none;
    padding: 0.8rem 1.5rem;
    border-radius: 50px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    font-size: 1rem;
  }
  
  .app-bar-btn:hover {
    color: #ffcc00 !important;
    background: linear-gradient(145deg, #ffcc00, #ff9900);
    transform: scale(1.1);
  }
  
  .account-icon {
    color: #ffcc00 !important;
    transition: all 0.3s ease;
  }
  
  .account-btn:hover .account-icon {
    color: #e0e0e0 !important;
  }
  </style>
  