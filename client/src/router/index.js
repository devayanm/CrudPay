import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue";
import WalletView from "@/views/WalletView.vue";
import PaymentIntegrationView from "@/views/PaymentIntegration.vue";
import ConvertCryptoView from "@/views/ConvertCrypto.vue";
import ProfileView from "@/views/ProfileView.vue"
import PaymentMethodsView from "@/views/PaymentMethodsView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/dashboard", component: DashboardView },
  { path: "/wallet", component: WalletView },
  { path: "/payment-integration", component: PaymentIntegrationView },
  { path: "/convert-crypto", component: ConvertCryptoView },
  { path: "/profile", name: "Profile", component: ProfileView },
  { path: "/payment-methods", name: "PaymentMethods", component: PaymentMethodsView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
