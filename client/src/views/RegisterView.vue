<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card class="pa-5">
                    <v-card-title class="headline primary--text">Register</v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="register">
                            <v-text-field label="Email" v-model="email" :rules="emailRules" type="email"
                                required></v-text-field>
                            <v-text-field label="Password" v-model="password" :rules="passwordRules" type="password"
                                required></v-text-field>
                            <v-text-field label="Confirm Password" v-model="confirmPassword"
                                :rules="confirmPasswordRules" type="password" required></v-text-field>
                            <v-btn color="primary" block type="submit">Register</v-btn>
                            <v-btn color="secondary" block @click="goToLogin">
                                Already have an account? Login
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
