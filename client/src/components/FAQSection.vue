<template>
    <v-col cols="12">
      <v-card class="faq-card elevation-4 rounded-lg" color="white">
        <v-card-title class="headline">
          <v-icon size="large" class="mr-3">mdi-help-circle-outline</v-icon>
          Frequently Asked Questions
        </v-card-title>
        <v-card-text>
          <v-expansion-panels v-model="activePanel" popout>
            <v-expansion-panel
              v-for="(faq, index) in visibleFaqs"
              :key="index"
              class="faq-panel"
              :style="{ backgroundColor: getBackgroundColor(index) }"
            >
              <template #title>
                <v-expand-transition>
                  <div class="faq-title">{{ faq.question }}</div>
                </v-expand-transition>
              </template>
              <template #text>
                <div class="faq-answer">{{ faq.answer }}</div>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-btn
            v-if="showLoadMore"
            @click="loadMore"
            color="primary"
            class="mt-4"
            dark
          >
            Load More
          </v-btn>
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
          { question: 'What are the accepted payment methods?', answer: 'We accept various payment methods including credit/debit cards, PayPal, and bank transfers. Check the payment options available during checkout.' },
          { question: 'How can I update my personal information?', answer: 'You can update your personal information by going to your profile settings and editing the required fields. Don’t forget to save changes.' },
          { question: 'How do I track my order?', answer: 'Once your order is shipped, you will receive a tracking number via email. Use this number to track your order on our website or through the courier’s website.' },
          { question: 'Can I cancel or modify my order?', answer: 'Orders can be modified or canceled within 30 minutes of placing them. After this period, changes may not be possible. Contact customer support for assistance.' },
          { question: 'What is your return policy?', answer: 'We offer a 30-day return policy. Products must be returned in their original condition. Refer to our return policy page for detailed instructions and exceptions.' },
          { question: 'How do I contact customer support?', answer: 'You can contact customer support via email at support@example.com or through our live chat feature on the website during business hours.' },
          { question: 'Do you offer international shipping?', answer: 'Yes, we offer international shipping. Shipping costs and delivery times vary based on your location. Check our shipping policy for more details.' },
          { question: 'Where can I find your terms of service?', answer: 'Our terms of service can be found at the bottom of our website under the "Terms of Service" link. It outlines the terms and conditions of using our services.' },
          { question: 'How do I subscribe to your newsletter?', answer: 'You can subscribe to our newsletter by entering your email address in the subscription box located at the bottom of our homepage or during checkout.' },
          { question: 'What should I do if I receive a defective product?', answer: 'If you receive a defective product, please contact our customer support team with your order number and details of the issue. We will assist you with a replacement or refund.' },
          { question: 'Can I use a discount code on sale items?', answer: 'Discount codes generally cannot be combined with sale items. Check the terms of the discount code for specific details on its usage.' },
          { question: 'How secure is my personal information?', answer: 'We take your privacy seriously. Our website uses encryption and secure protocols to protect your personal information. For more details, review our privacy policy.' },
          { question: 'How can I provide feedback about your products or services?', answer: 'We welcome your feedback! You can provide feedback through our website’s feedback form, by emailing us directly, or by leaving a review on our product pages.' },
        ],
        visibleCount: 5,
        activePanel: null,
      };
    },
    computed: {
      visibleFaqs() {
        return this.faqs.slice(0, this.visibleCount);
      },
      showLoadMore() {
        return this.faqs.length > this.visibleCount;
      },
    },
    methods: {
      loadMore() {
        this.visibleCount += 5; // Increase the visible FAQ count by 5 or any number you prefer
      },
      getBackgroundColor(index) {
        // Alternate background colors for a more engaging look
        return index % 2 === 0 ? '#F7F9FC' : '#FFFFFF';
      }
    },
  };
  </script>
  
  <style scoped>
  .faq-card {
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.1);
  }
  
  .headline {
    font-weight: 700;
    font-size: 1.875rem;
    color: #333;
    background: linear-gradient(45deg, #6c63ff, #b93d3d);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .faq-panel {
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 1rem;
    transition: background-color 0.3s ease;
  }
  
  .faq-title {
    font-weight: 700;
    font-size: 1.125rem;
    padding: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  
  .faq-title:hover {
    background-color: #e0e0e0;
    color: #333;
  }
  
  .faq-answer {
    padding: 16px;
    color: #444;
  }
  
  .v-btn {
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .v-btn:hover {
    background-color: #0044cc;
    transform: scale(1.05);
  }
  
  @media (max-width: 600px) {
    .headline {
      font-size: 1.5rem;
    }
  
    .faq-title {
      font-size: 1rem;
    }
  }
  </style>
  