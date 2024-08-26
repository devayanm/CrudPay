<template>
    <v-col cols="12">
      <v-card class="elevation-4 rounded-lg" color="white">
        <v-card-title class="headline">
          <v-icon left>mdi-help-circle-outline</v-icon>
          Frequently Asked Questions
        </v-card-title>
        <v-card-text>
          <v-expansion-panels v-model="activePanel">
            <v-expansion-panel v-for="(faq, index) in faqs" :key="index">
              <template #title>
                {{ faq.question }}
              </template>
              <template #text>
                {{ faq.answer }}
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-col>
  </template>
  
  <script>
  export default {
    data() {
      return {
        faqs: [
          { question: 'How do I reset my password?', answer: 'To reset your password, go to the login page and click on "Forgot Password". Follow the instructions sent to your email to reset it.' },
          { question: 'How do I link my bank account?', answer: 'Navigate to the account settings and select "Bank Account" under "Financial Integration". Follow the instructions to link your bank account.' },
          // Add more FAQ items here
        ],
        activePanel: null,
      };
    },
  };
  </script>
  
  <style scoped>
  .v-expansion-panel-title {
    font-weight: 700;
    background-color: #F2F2F2;
  }
  .v-expansion-panel-text {
    padding: 16px;
  }
  </style>
  