<template>
  <v-container>
    <NavigationButtons />
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="pa-5">
          <v-card-title class="headline">User Profile</v-card-title>
          <v-card-text>
            <user-profile />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UserProfile from '@/components/UserProfile.vue';

export default {
  name: 'ProfileView',
  components: {
    UserProfile
  }
};
</script>

<style scoped>
/* Style specific to the profile view */
.v-container {
  margin-top: 20px;
}

.v-card {
  background-color: #f5f5f5;
  border-radius: 8px;
}

.v-card-title {
  font-weight: bold;
}

.v-btn {
  margin-top: 10px;
}
</style>
