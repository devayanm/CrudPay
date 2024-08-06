<template>
  <v-container>
    <NavigationButtons />
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-5 profile-card">
          <v-card-title class="headline primary--text">User Profile</v-card-title>
          <v-divider class="mb-4"></v-divider>
          <v-card-text>
            <UserProfile />
          </v-card-text>
        </v-card>
        <v-card class="pa-5 mt-4 kyc-card">
          <v-card-title class="headline primary--text">KYC Verification</v-card-title>
          <v-divider class="mb-4"></v-divider>
          <v-card-text>
            <KYCVerification />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserProfile from '@/components/UserProfile.vue';
import KYCVerification from '@/components/KYCVerification.vue';

export default {
  name: 'ProfileView',
  components: {
    UserProfile,
    KYCVerification
  }
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}

.profile-card, .kyc-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.primary--text {
  color: #1976D2;
}

.v-card-title {
  font-weight: bold;
  font-size: 1.6rem;
}

.v-divider {
  margin: 0 -24px;
}

.v-card-text {
  padding-top: 16px;
}

.v-btn {
  margin-top: 10px;
}
</style>
