<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card class="pa-5">
                    <v-card-title class="headline">Convert Cryptocurrency</v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field v-model="amount" label="Amount" :rules="amountRules" type="number"
                                required></v-text-field>

                            <v-select v-model="fromCurrency" :items="currencies" label="From Currency"
                                :rules="[requiredRule]" required></v-select>

                            <v-select v-model="toCurrency" :items="currencies" label="To Currency"
                                :rules="[requiredRule]" required></v-select>

                            <v-btn @click="convertCurrency" :disabled="!valid" color="primary" class="mt-4">
                                Convert
                            </v-btn>

                            <v-divider class="my-4"></v-divider>

                            <v-alert v-if="conversionResult" type="info">
                                Conversion Result: {{ conversionResult }}
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
    name: 'ConvertCrypto',
    data() {
        return {
            amount: 0,
            fromCurrency: '', // Currency to convert from
            toCurrency: '',   // Currency to convert to
            currencies: ['BTC', 'ETH', 'USDT', 'INR'],
            conversionResult: null,
            valid: false,
            requiredRule: v => !!v || 'This field is required',
            amountRules: [
                v => !!v || 'Amount is required',
                v => v > 0 || 'Amount must be greater than zero'
            ]
        };
    },
    methods: {
        async convertCurrency() {
            if (!this.valid || !this.fromCurrency || !this.toCurrency || this.fromCurrency === this.toCurrency) {
                this.conversionResult = 'Please fill out all fields correctly and select different currencies.';
                return;
            }

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
            }
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
