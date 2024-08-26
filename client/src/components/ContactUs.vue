<template>
    <v-col cols="12" md="8" lg="6">
      <v-card class="elevation-4 rounded-lg" color="white">
        <v-card-title class="headline">
          <v-icon left>mdi-email-outline</v-icon>
          Contact Us
        </v-card-title>
        <v-card-text>
          <v-form ref="contactForm" v-model="formValid">
            <v-text-field v-model="contactForm.name" label="Name" :rules="[rules.required]" outlined dense
              prepend-icon="mdi-account" class="mb-4" hint="Enter your full name" persistent-hint />
            <v-text-field v-model="contactForm.email" label="Email" :rules="[rules.required, rules.email]" outlined
              dense prepend-icon="mdi-email" class="mb-4" hint="Enter your email address" persistent-hint />
            <v-textarea v-model="contactForm.message" label="Message" :rules="[rules.required]" outlined dense
              rows="5" prepend-icon="mdi-message-outline" class="mb-4" hint="Enter your message here"
              persistent-hint />
            <v-btn @click="submitForm" :disabled="!formValid" color="primary" large block elevation="2">
              Send Message
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formValid: false,
        contactForm: {
          name: '',
          email: '',
          message: '',
        },
        rules: {
          required: (v) => !!v || 'Required.',
          email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid.',
        },
      };
    },
    methods: {
      submitForm() {
        if (this.$refs.contactForm.validate()) {
          // Handle form submission logic here
          this.$emit('formSubmitted', this.contactForm);
          this.contactForm.name = '';
          this.contactForm.email = '';
          this.contactForm.message = '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .v-text-field, .v-textarea {
    margin-bottom: 1rem;
  }
  </style>
  