<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card class="pa-5">
                    <v-card-title class="headline primary--text">Login</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="login">
                            <v-text-field label="Email" v-model="email" :rules="emailRules" type="email"
                                required></v-text-field>
                            <v-text-field label="Password" v-model="password" :rules="passwordRules" type="password"
                                required></v-text-field>
                            <v-btn color="primary" block type="submit">Login</v-btn>
                            <v-btn color="secondary" block @click="goToRegister">
                                Create New Account
                            </v-btn>
                        </v-form>
                        <v-alert v-if="error" type="error" class="mt-4">{{ error }}</v-alert>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'LoginView',
    data() {
        return {
            email: '',
            password: '',
            error: null,
            emailRules: [(v) => !!v || 'Email is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
            passwordRules: [(v) => !!v || 'Password is required']
        };
    },
    methods: {
        login() {
            // Reset the error message
            this.error = null;

            // Simulate an API call for login
            if (this.email === 'test@example.com' && this.password === 'password') {
                this.$router.push('/dashboard');
            } else {
                this.error = 'Invalid email or password. Please try again.';
            }
        },
        goToRegister() {
            this.$router.push('/register');
        }
    }
};
</script>

<style scoped>
.v-container {
    margin-top: 50px;
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
