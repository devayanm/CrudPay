<template>
    <v-card class="contact-card elevation-4 rounded-lg" color="white">
      <v-card-title class="headline">
        <v-icon size="large" class="mr-3">mdi-email-outline</v-icon>
        Contact Us
      </v-card-title>
      <v-card-text>
        <v-form ref="contactForm" v-model="formValid">
          <v-text-field
            v-model="contactForm.name"
            label="Name"
            :rules="[rules.required]"
            outlined
            dense
            prepend-icon="mdi-account"
            class="mb-4"
            hint="Enter your full name"
            persistent-hint
            aria-label="Name"
          />
          <v-text-field
            v-model="contactForm.email"
            label="Email"
            :rules="[rules.required, rules.email]"
            outlined
            dense
            prepend-icon="mdi-email"
            class="mb-4"
            hint="Enter your email address"
            persistent-hint
            aria-label="Email"
          />
          <v-textarea
            v-model="contactForm.message"
            label="Message"
            :rules="[rules.required]"
            outlined
            dense
            rows="5"
            prepend-icon="mdi-message-outline"
            class="mb-4"
            hint="Enter your message here"
            persistent-hint
            aria-label="Message"
          />
          <v-btn
            @click="submitForm"
            :disabled="!formValid || loading"
            color="primary"
            large
            block
            elevation="2"
            class="submit-btn"
          >
            <v-icon v-if="loading" left>mdi-loading</v-icon>
            Send Message
          </v-btn>
          <v-alert
            v-if="submissionError"
            type="error"
            class="mt-4"
            border="left"
            prominent
          >
            An error occurred while sending your message. Please try again.
          </v-alert>
          <v-alert
            v-if="submissionSuccess"
            type="success"
            class="mt-4"
            border="left"
            prominent
          >
            Your message has been sent successfully!
          </v-alert>
        </v-form>
      </v-card-text>
    </v-card>
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
          required: (v) => !!v || 'This field is required.',
          email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid.',
        },
        loading: false,
        submissionError: false,
        submissionSuccess: false,
      };
    },
    methods: {
      async submitForm() {
        if (this.$refs.contactForm.validate()) {
          this.loading = true;
          this.submissionError = false;
          this.submissionSuccess = false;
          try {
            await this.sendForm();
            this.submissionSuccess = true;
            this.contactForm.name = '';
            this.contactForm.email = '';
            this.contactForm.message = '';
          } catch (error) {
            this.submissionError = true;
          } finally {
            this.loading = false;
          }
        }
      },
      async sendForm() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            Math.random() > 0.5 ? resolve() : reject(new Error('Failed to send message'));
          }, 2000);
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .contact-card {
    border-radius: 12px;
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.2);
  }
  
  .headline {
    font-weight: 700;
    font-size: 1.875rem;
    color: #006064;
    background: linear-gradient(45deg, #004d40, #00796b);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border-bottom: 2px solid #004d40;
  }
  
  .v-text-field,
  .v-textarea {
    margin-bottom: 1rem;
  }
  
  .v-text-field .v-input__control,
  .v-textarea .v-input__control {
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  
  .v-btn.submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, background-color 0.3s ease;
  }
  
  .v-btn.submit-btn:hover {
    background-color: #004d40;
    transform: scale(1.05);
  }
  
  .v-alert {
    margin-top: 1rem;
  }
  
  @media (max-width: 600px) {
    .headline {
      font-size: 1.5rem;
    }
  }
  </style>
  