<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-5" outlined>
          <v-card-title class="headline">User Profile</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="formValid" @submit.prevent="updateProfile">
              <v-text-field
                v-model="user.name"
                label="Name"
                :rules="[rules.required]"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                label="Email"
                :rules="[rules.required, rules.email]"
                required
              ></v-text-field>
              <v-text-field
                v-model="user.phone"
                label="Phone Number"
                :rules="[rules.phone]"
              ></v-text-field>
              <v-btn color="primary" @click="updateProfile">Save</v-btn>
            </v-form>
            <v-alert v-if="error" type="error" class="mt-3">{{ error }}</v-alert>
            <v-alert v-if="loading" type="info" class="mt-3">Loading user data...</v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      formValid: false,
      user: {
        name: '',
        email: '',
        phone: ''
      },
      loading: false,
      error: null,
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
        phone: value => /^\+?\d{10,15}$/.test(value) || 'Phone number must be valid (10-15 digits).'
      }
    };
  },
  methods: {
    async updateProfile() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          await this.$store.dispatch('auth/updateProfile', this.user);
          this.$emit('profile-updated');
          this.$router.push('/dashboard');
        } catch (error) {
          this.error = 'Failed to update profile. Please try again later.';
          console.error('Failed to update profile:', error);
        } finally {
          this.loading = false;
        }
      }
    }
  },
  async created() {
    try {
      this.loading = true;
      const user = await this.$store.dispatch('auth/fetchUserProfile');
      this.user = user || { name: '', email: '', phone: '' };
    } catch (error) {
      this.error = 'Failed to fetch user profile. Please try again later.';
      console.error('Failed to fetch user profile:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.v-card {
  max-width: 500px;
  margin: auto;
}

.v-card-title {
  font-weight: bold;
}

.v-alert {
  margin-top: 20px;
}
</style>
