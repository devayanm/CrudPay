import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import DashboardView from "@/views/DashboardView.vue";
import WalletView from "@/views/WalletView.vue";
import PaymentIntegrationView from "@/views/PaymentIntegration.vue";
import ConvertCryptoView from "@/views/ConvertCrypto.vue";
import ProfileView from "@/views/ProfileView.vue";
import PaymentMethodsView from "@/views/PaymentMethodsView.vue";
import FeaturesView from "@/views/FeaturesView.vue";
import SupportView from "@/views/SupportView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/features", name: "features", component: FeaturesView },
  { path: "/support", name: "support", component: SupportView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/dashboard", name: "dashboard", component: DashboardView },
  { path: "/wallet", name: "wallet", component: WalletView },
  {
    path: "/payment-integration",
    name: "paymentintegration",
    component: PaymentIntegrationView,
  },
  {
    path: "/convert-crypto",
    name: "convertcrypto",
    component: ConvertCryptoView,
  },
  { path: "/profile", name: "Profile", component: ProfileView },
  {
    path: "/payment-methods",
    name: "PaymentMethods",
    component: PaymentMethodsView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
