<template>
  <v-container fluid class="pa-6">
    <!-- Support & Help Card -->
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="elevation-4 rounded-lg" color="primary" dark>
          <v-card-title class="headline">
            <v-icon size="large" class="mr-3">mdi-help-circle-outline</v-icon>
            Support & Help
          </v-card-title>
          <v-card-subtitle class="subheading mt-2">
            Our support team is here to help with any questions or issues you might have. Use the form below to get in
            touch with us, or browse our FAQs for quick answers.
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <!-- Contact Us Form -->
    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="8" lg="6">
        <ContactUs @formSubmitted="handleFormSubmitted" />
      </v-col>
    </v-row>

    <!-- FAQ Section -->
    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="8" lg="6">
        <FAQSection />
      </v-col>
    </v-row>

    <!-- Additional Resources -->
    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="8" lg="6">
        <AdditionalResources />
      </v-col>
    </v-row>

    <!-- Floating Action Button (Speed Dial) -->
    <LiveChat />
  </v-container>
</template>

<script>
import ContactUs from '@/components/ContactUs.vue';
import FAQSection from '@/components/FAQSection.vue';
import LiveChat from '@/components/LiveChat.vue';
import AdditionalResources from '@/components/AdditionalResources.vue';

export default {
  components: {
    ContactUs,
    FAQSection,
    LiveChat,
    AdditionalResources,
  },
};
</script>

<style scoped>
.v-container {
  background-color: #F5F7F9;
}

.v-card {
  background-color: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  font-weight: 700;
  font-size: 1.5rem;
}

.v-card-subtitle {
  font-size: 1.1rem;
  color: #444444;
}

.v-btn {
  font-weight: 700;
}

/* Styles for floating LiveChat button */
.floating-chat {
  position: fixed;
  bottom: 20px; /* Distance from the bottom */
  right: 20px;  /* Distance from the right */
  z-index: 2000; /* Ensure it’s above other elements */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Shadow for floating effect */
  transform: translateY(0); /* Ensure it’s not shifted */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition for floating effect */
}

.floating-chat:hover {
  transform: translateY(-10px); /* Lift the button on hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4); /* Enhance shadow on hover */
}
</style>
