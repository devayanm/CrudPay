<template>
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
    </v-card-text>
  </v-card>
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
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
        phone: (value) => /^\+?\d{10,15}$/.test(value) || 'Phone number must be valid (10-15 digits).'
      }
    };
  },
  methods: {
    async updateProfile() {
      if (this.$refs.form.validate()) {
        try {
          // Dispatch action to update user profile
          await this.$store.dispatch('auth/updateProfile', this.user);
          this.$emit('profile-updated');
          this.$router.push('/dashboard'); // Redirect to dashboard after updating
        } catch (error) {
          console.error('Failed to update profile:', error);
        }
      }
    }
  },
  async created() {
    try {
      // Fetch the user data when the component is created
      const user = await this.$store.dispatch('auth/fetchUserProfile');
      this.user = user;
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
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
</style>
