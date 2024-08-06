<template>
    <v-container fluid>
        <NavigationButtons />
        <v-row justify="center">
            <v-col cols="12" md="8" lg="6">
                <v-card class="pa-6 payment-integration-card">
                    <v-card-title class="headline">Payment Integration</v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field 
                                v-model="merchantId" 
                                label="Merchant ID" 
                                :rules="[requiredRule]" 
                                required
                                outlined 
                                dense
                                placeholder="Enter your Merchant ID"
                                hint="Your unique Merchant ID from the payment provider"
                                persistent-hint
                            ></v-text-field>

                            <v-text-field 
                                v-model="apiKey" 
                                label="API Key" 
                                :rules="[requiredRule]" 
                                required
                                outlined 
                                dense
                                placeholder="Enter your API Key"
                                hint="Your API Key provided by the payment gateway"
                                persistent-hint
                            ></v-text-field>

                            <v-select 
                                v-model="paymentMethod" 
                                :items="paymentMethods" 
                                label="Payment Method"
                                :rules="[requiredRule]" 
                                required 
                                outlined 
                                dense
                                placeholder="Select a payment method"
                                hint="Choose the payment method you want to integrate"
                                persistent-hint
                            ></v-select>

                            <v-btn 
                                @click="submitIntegration" 
                                :disabled="!valid" 
                                color="primary" 
                                class="mt-4 rounded elevation-2"
                            >
                                Integrate
                            </v-btn>

                            <v-divider class="my-4"></v-divider>

                            <v-alert 
                                v-if="integrationResult" 
                                :type="alertType" 
                                class="integration-alert"
                            >
                                <v-icon left :color="alertIconColor">{{ alertIcon }}</v-icon>
                                {{ integrationResult }}
                            </v-alert>

                            <!-- Loading Spinner -->
                            <v-overlay v-if="loading" absolute>
                                <v-progress-circular 
                                    indeterminate 
                                    color="primary" 
                                    size="64"
                                    class="loading-spinner"
                                ></v-progress-circular>
                            </v-overlay>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'PaymentIntegration',
    data() {
        return {
            merchantId: '',
            apiKey: '',
            paymentMethod: null,
            paymentMethods: ['Stripe', 'PayPal', 'Square', 'Crypto'],
            integrationResult: null,
            valid: false,
            requiredRule: v => !!v || 'This field is required',
            loading: false
        };
    },
    computed: {
        alertType() {
            return this.integrationResult.includes('successful') ? 'success' : 'warning';
        },
        alertIcon() {
            return this.alertType === 'success' ? 'mdi-check-circle-outline' : 'mdi-alert-circle-outline';
        },
        alertIconColor() {
            return this.alertType === 'success' ? 'success' : 'warning';
        }
    },
    methods: {
        async submitIntegration() {
            if (!this.valid || !this.paymentMethod) {
                this.integrationResult = 'Please fill out all fields correctly.';
                return;
            }

            this.loading = true;

            // Simulate API integration process
            await new Promise(resolve => setTimeout(resolve, 2000));

            this.integrationResult = `Integration with ${this.paymentMethod} using Merchant ID: ${this.merchantId} and API Key: ${this.apiKey} was successful.`;
            this.loading = false;
        }
    }
};
</script>

<style scoped>
.payment-integration-card {
    background: linear-gradient(135deg, #f5f5f5, #eaeaea);
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.v-card-title {
    font-weight: bold;
    font-size: 2rem;
    color: #333;
}

.v-text-field, .v-select {
    margin-bottom: 16px;
}

.v-btn {
    font-weight: bold;
    padding: 12px 24px;
    border-radius: 8px;
}

.integration-alert {
    margin-top: 20px;
    border-radius: 8px;
    padding: 12px;
}

.loading-spinner {
    background-color: rgba(255, 255, 255, 0.8);
}
</style>
