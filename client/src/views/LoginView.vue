<template>
  <v-container fluid>
    <NavigationButtons />
    <v-row justify="center">
      <v-col cols="12" md="6" lg="4">
        <v-card class="pa-6 login-card">
          <v-card-title class="headline primary--text">Login</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="login">
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

              <v-btn
                @click="login"
                color="primary"
                block
                class="mt-4 login-btn"
                type="submit"
              >
                Login
              </v-btn>

              <v-btn
                @click="goToRegister"
                color="secondary"
                block
                class="mt-2 register-btn"
              >
                Create New Account
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
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      error: null,
      emailRules: [
        (v) => !!v || "Email is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    login() {
      this.error = null;

      if (this.email === "test@example.com" && this.password === "password") {
        this.$router.push("/dashboard");
      } else {
        this.error = "Invalid email or password. Please try again.";
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.login-card {
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

.login-btn {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.register-btn {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.error-alert {
  border-radius: 8px;
  padding: 12px;
}
</style>
