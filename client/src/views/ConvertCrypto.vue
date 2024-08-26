<template>
    <v-container fluid>
        <NavigationButtons />
        <v-row justify="center">
            <v-col cols="12" md="6" lg="5">
                <v-card class="pa-6 convert-crypto-card">
                    <v-card-title class="headline">Convert Cryptocurrency</v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field 
                                v-model="amount" 
                                label="Amount" 
                                :rules="amountRules" 
                                type="number"
                                required
                                outlined 
                                dense
                                placeholder="Enter amount"
                                hint="Amount to be converted"
                                persistent-hint
                            ></v-text-field>

                            <v-select 
                                v-model="fromCurrency" 
                                :items="currencies" 
                                label="From Currency"
                                :rules="[requiredRule]" 
                                required
                                outlined 
                                dense
                                placeholder="Select currency"
                                hint="Currency to convert from"
                                persistent-hint
                            ></v-select>

                            <v-select 
                                v-model="toCurrency" 
                                :items="currencies" 
                                label="To Currency"
                                :rules="[requiredRule]" 
                                required
                                outlined 
                                dense
                                placeholder="Select currency"
                                hint="Currency to convert to"
                                persistent-hint
                            ></v-select>

                            <v-btn 
                                @click="convertCurrency" 
                                :disabled="!valid" 
                                color="primary" 
                                class="mt-4 rounded elevation-2"
                            >
                                Convert
                            </v-btn>

                            <v-divider class="my-4"></v-divider>

                            <v-alert 
                                v-if="conversionResult" 
                                :type="alertType" 
                                class="conversion-alert"
                            >
                                <v-icon left :color="alertIconColor">{{ alertIcon }}</v-icon>
                                {{ conversionResult }}
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
    name: 'ConvertCrypto',
    data() {
        return {
            amount: 0,
            fromCurrency: '', // Currency to convert from
            toCurrency: '',   // Currency to convert to
            currencies: ['BTC', 'ETH', 'USDT', 'INR'],
            conversionResult: null,
            valid: false,
            loading: false,
            requiredRule: v => !!v || 'This field is required',
            amountRules: [
                v => !!v || 'Amount is required',
                v => v > 0 || 'Amount must be greater than zero'
            ]
        };
    },
    computed: {
        alertType() {
            return this.conversionResult && !this.conversionResult.includes('error') ? 'success' : 'warning';
        },
        alertIcon() {
            return this.alertType === 'success' ? 'mdi-check-circle-outline' : 'mdi-alert-circle-outline';
        },
        alertIconColor() {
            return this.alertType === 'success' ? 'success' : 'warning';
        }
    },
    methods: {
        async convertCurrency() {
            if (!this.valid || !this.fromCurrency || !this.toCurrency || this.fromCurrency === this.toCurrency) {
                this.conversionResult = 'Please fill out all fields correctly and select different currencies.';
                return;
            }

            this.loading = true;

            try {
                // Dummy conversion rates
                const conversionRates = {
                    BTC: { ETH: 15, USDT: 20000, INR: 5000000 },
                    ETH: { BTC: 1 / 15, USDT: 1333, INR: 333333 },
                    USDT: { BTC: 1 / 20000, ETH: 1 / 1333, INR: 75 },
                    INR: { BTC: 1 / 5000000, ETH: 1 / 333333, USDT: 1 / 75 }
                };

                const rate = conversionRates[this.fromCurrency][this.toCurrency];
                if (!rate) {
                    this.conversionResult = 'Conversion rate not available.';
                    return;
                }

                const result = this.amount * rate;
                this.conversionResult = `${this.amount} ${this.fromCurrency} = ${result.toFixed(2)} ${this.toCurrency}`;
            } catch (error) {
                console.error('Error during conversion:', error);
                this.conversionResult = 'An error occurred during conversion.';
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.convert-crypto-card {
    background: linear-gradient(135deg, #e2e2e2, #f7f7f7);
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

.conversion-alert {
    margin-top: 20px;
    border-radius: 8px;
    padding: 12px;
}

.loading-spinner {
    background-color: rgba(255, 255, 255, 0.8);
}
</style>
