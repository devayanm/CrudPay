<template>
  <v-app class="global-background">
    <!-- Preloader -->
    <PreLoader :isLoading="isLoading" />

    <!-- App Bar -->
    <AppBar />

    <!-- Main Content -->
    <v-main >
      <v-container fluid class="pa-0 ma-0">
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Footer -->
    <AppFooter />
  </v-app>
</template>

<script>
import PreLoader from "./components/PreLoader.vue";
import AppBar from "./components/AppBar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    PreLoader,
    AppBar,
    AppFooter,
  },
  data() {
    return {
      isLoading: true,
    };
  },
};
</script>

<style>
body {
  font-family: "Poppins", sans-serif;
  margin: 0;
  padding: 0;
  color: #e0e0e0;
}

.global-background {
  /* position: relative; */
  top: 0;
  left: 0;
  background-color: #6c757d !important;
  z-index: -1;
}

</style>
