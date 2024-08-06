<template>
  <v-container fluid>
    <NavigationButtons />
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-6 register-card">
          <v-card-title class="headline primary--text">Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="register">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                type="email"
                required
                outlined
                dense
                placeholder="Enter your email"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                :rules="passwordRules"
                type="password"
                required
                outlined
                dense
                placeholder="Enter your password"
              ></v-text-field>

              <v-text-field
                v-model="confirmPassword"
                label="Confirm Password"
                :rules="confirmPasswordRules"
                type="password"
                required
                outlined
                dense
                placeholder="Confirm your password"
              ></v-text-field>

              <v-btn
                @click="register"
                color="primary"
                block
                class="mt-4 register-btn"
                type="submit"
              >
                Register
              </v-btn>

              <v-btn
                @click="goToLogin"
                color="secondary"
                block
                class="mt-2 login-btn"
              >
                Already have an account? Login
              </v-btn>
            </v-form>

            <v-alert
              v-if="error"
              type="error"
              class="mt-4 error-alert"
            >
              {{ error }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      error: null,
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 6 || 'Password must be at least 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm Password is required',
        v => v === this.password || 'Passwords must match'
      ]
    };
  },
  methods: {
    register() {
      this.error = null;

      if (this.password !== this.confirmPassword) {
        this.error = 'Passwords do not match.';
        return;
      }

      // Simulate an API call for registration
      if (this.email && this.password && this.confirmPassword) {
        this.$router.push('/login');
      } else {
        this.error = 'Please fill out all fields.';
      }
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.register-card {
  background: linear-gradient(135deg, #ffffff, #f5f5f5);
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  font-weight: bold;
  font-size: 1.8rem;
  color: #333;
}

.v-text-field,
.v-btn {
  margin-top: 16px;
}

.v-text-field {
  background-color: #fff;
}

.v-btn {
  font-weight: bold;
  padding: 12px;
  border-radius: 8px;
}

.register-btn {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.login-btn {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.error-alert {
  border-radius: 8px;
  padding: 12px;
}
</style>
