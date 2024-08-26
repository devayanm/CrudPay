<template>
  <v-container>
    <!-- Welcome Section -->
    <v-row>
      <NavigationButtons />
      <v-col cols="12">
        <div class="welcome-banner pa-4 mb-4">
          <h1 class="headline primary--text">Welcome to Your Profile Dashboard!</h1>
          <p class="text--secondary mt-2">
            Manage your personal information, monitor your KYC (Know Your Customer) status, and ensure your profile is
            up-to-date. Complete the KYC verification process to secure your account and enjoy uninterrupted services.
          </p>
        </div>
      </v-col>
    </v-row>

    <!-- Profile and KYC Cards -->
    <v-row justify="center">
      <v-col cols="12" md="8">
        <!-- Profile Card -->
        <v-card class="profile-card pa-5" outlined>
          <v-card-title class="headline">Profile</v-card-title>
          <v-divider class="mb-4"></v-divider>
          <v-alert type="warning" class="mt-4">
            <strong>Note:</strong> Ensure your profile information is accurate and up-to-date. Click the 'Edit' button
            to
            make changes.
          </v-alert>
          <UserProfile />
        </v-card>

        <!-- KYC Verification Card -->
        <v-card class="kyc-card pa-5 mt-4" outlined>
          <v-card-title class="headline">KYC</v-card-title>
          <v-divider class="mb-4"></v-divider>
          <v-alert type="warning" class="mt-4">
            <strong>Note:</strong> Ensure all submitted documents are clear and up-to-date. Incomplete or unclear
            documents may delay the verification process.
          </v-alert>
          <KYCVerification />
        </v-card>
      </v-col>
    </v-row>

    <!-- Helpful Tips and Guidelines Section -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="tips-card pa-5 mt-4" outlined>
          <v-card-title class="headline primary--text">Helpful Tips and Guidelines</v-card-title>
          <v-divider class="mb-4"></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">Updating Your Profile</v-list-item-title>
                  <v-list-item-subtitle>Keeping your profile information accurate helps us communicate effectively and
                    ensures the security of your account.</v-list-item-subtitle>
                  <v-list-item-subtitle class="mt-2">Click the 'Update Profile Information' button to modify your
                    details whenever necessary.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">Completing KYC Verification</v-list-item-title>
                  <v-list-item-subtitle>The KYC process is essential for verifying your identity and preventing
                    fraudulent activities. Follow the guidelines carefully to complete this
                    process.</v-list-item-subtitle>
                  <v-list-item-subtitle class="mt-2">If your KYC status is 'Pending', ensure you submit any missing
                    documents promptly to avoid delays.</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="font-weight-bold">Need Assistance?</v-list-item-title>
                  <v-list-item-subtitle>If you encounter any issues or have questions, our support team is available to
                    help. Visit the support page or contact us directly via email.</v-list-item-subtitle>
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
import UserProfile from '@/components/UserProfile.vue';
import KYCVerification from '@/components/KYCVerification.vue';

export default {
  name: 'ProfileView',
  components: {
    UserProfile,
    KYCVerification
  },
  data() {
    return {
      kycProgress: 50, // Example progress percentage
      kycVerified: false // Example verification status
    };
  },
  methods: {
    updateProfile() {
      // Logic to handle profile update
      this.$router.push('/update-profile'); // Redirect to profile update page
    },
    reSubmitKYC() {
      // Logic to handle KYC resubmission
      this.$router.push('/resubmit-kyc'); // Redirect to KYC resubmission page
    }
  }
};
</script>

<style scoped>
.v-container {
  margin-top: 20px;
}

.welcome-banner {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

.welcome-banner .headline {
  font-size: 2rem;
  font-weight: 700;
}

.welcome-banner p {
  font-size: 1.2rem;
}

.profile-card,
.kyc-card,
.tips-card {
  background: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  color: #ffffff
}

.profile-card:hover,
.kyc-card:hover,
.tips-card:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
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
  border-top: 2px solid #1976D2;
}

.v-card-text {
  padding-top: 16px;
}

.v-btn {
  margin-top: 10px;
}

.progress-bar {
  margin-top: 8px;
}

.v-alert {
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff; 
  border-color: #ffcc80;
  color: #e64a19;
  font-size: 1rem;
}

.tips-card {
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff
}

.tips-card .font-weight-bold {
  font-weight: bold;
}

.tips-card .mt-2 {
  margin-top: 10px;
}

.v-list-item-subtitle {
  font-size: 1rem;
}

.v-list-item-content {
  padding: 10px 0;
}
</style>
