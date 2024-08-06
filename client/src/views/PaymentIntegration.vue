<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="8">
                <v-card class="pa-5">
                    <v-card-title class="headline">Payment Integration</v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field v-model="merchantId" label="Merchant ID" :rules="[requiredRule]"
                                required></v-text-field>

                            <v-text-field v-model="apiKey" label="API Key" :rules="[requiredRule]"
                                required></v-text-field>

                            <v-select v-model="paymentMethod" :items="paymentMethods" label="Payment Method"
                                :rules="[requiredRule]" required></v-select>

                            <v-btn @click="submitIntegration" :disabled="!valid" color="primary" class="mt-4">
                                Integrate
                            </v-btn>

                            <v-divider class="my-4"></v-divider>

                            <v-alert v-if="integrationResult" type="info">
                                Integration Status: {{ integrationResult }}
                            </v-alert>
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
        };
    },
    methods: {
        submitIntegration() {
            if (!this.valid || !this.paymentMethod) {
                this.integrationResult = 'Please fill out all fields correctly.';
                return;
            }

            // Simulate API integration process
            this.integrationResult = `Integration with ${this.paymentMethod} using Merchant ID: ${this.merchantId} and API Key: ${this.apiKey} was successful.`;
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
}
</style>
