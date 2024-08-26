<template>
  <v-container fluid class="pa-6">
    <NavigationButtons />
    <!-- Support & Help Card -->
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="support-card elevation-5 rounded-lg">
          <v-card-title class="headline">
            <v-icon size="large" class="mr-3">mdi-help-circle-outline</v-icon>
            Support & Help
          </v-card-title>
          <v-card-subtitle class="subheading mt-2">
            Need assistance? We're here to help. Use the form below for inquiries, or explore our FAQs and additional
            resources for quick answers.
          </v-card-subtitle>
          <v-card-actions class="pa-3">
            <v-btn color="primary" @click="scrollToSection('contactForm')" large class="action-btn">Contact Us</v-btn>
            <v-btn color="primary" @click="scrollToSection('faqSection')" large class="ml-4 action-btn">FAQs</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Search Bar with Suggestions -->
    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-autocomplete v-model="searchQuery" :items="filteredSuggestions" :v-model:search-input="searchInput"
          label="Search for help topics" prepend-icon="mdi-magnify" outlined dense class="search-bar" item-value="title"
          item-text="title" hide-no-data hide-details :loading="loading" no-data-text="No suggestions available"
          @input="onSearchInput">
          <template #item="{ item }">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>

    <!-- Contact Us Form -->
    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="8" lg="6">
        <ContactUs ref="contactForm" @formSubmitted="handleFormSubmitted" />
      </v-col>
    </v-row>

    <!-- FAQ Section -->
    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="8" lg="6">
        <FAQSection ref="faqSection" />
      </v-col>
    </v-row>

    <!-- Additional Resources -->
    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="8" lg="6">
        <AdditionalResources />
      </v-col>
    </v-row>

    <!-- Address and Map -->
    <v-row class="mt-6" justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card class="address-card elevation-5 rounded-lg">
          <v-card-title class="headline">
            <v-icon size="large" class="mr-3">mdi-map-marker-outline</v-icon>
            Our Address
          </v-card-title>
          <v-card-text>
            <p>123 Web3 Street, Blockchain City, CryptoLand</p>
            <p>Email: support@example.com</p>
            <p>Phone: (123) 456-7890</p>
            <v-divider></v-divider>
            <v-img
              src="https://maps.googleapis.com/maps/api/staticmap?center=123+Web3+Street,+Blockchain+City,+CryptoLand&zoom=14&size=600x300&key=YOUR_API_KEY"
              alt="Map" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Floating Action Button (Live Chat) -->
    <LiveChat />

    <!-- Back to Top Button -->
    <v-btn class="back-to-top" fab fixed bottom right color="primary" @click="scrollToTop">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
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
  data() {
    return {
      searchQuery: '',
      searchInput: '',
      loading: false,
      resources: [
        { title: 'User Guide', description: 'Comprehensive guide for using CrudPay' },
        { title: 'API Documentation', description: 'Detailed API documentation for developers' },
        { title: 'Getting Started', description: 'Quick start guide for new users' },
        { title: 'Troubleshooting', description: 'Common issues and solutions' },
        { title: 'Contact Support', description: 'How to get in touch with support' },
        // Add more resources here
      ],
    };
  },
  computed: {
    filteredSuggestions() {
      return this.resources.filter(resource =>
        resource.title.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    },
  },
  methods: {
    scrollToSection(refName) {
      const section = this.$refs[refName];
      if (section) {
        section.$el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    handleFormSubmitted(formData) {
      // Handle form submission logic here
      console.log('Form submitted:', formData);
    },
    onSearchInput(value) {
      this.searchInput = value;
      this.loading = true;
      // Simulate an API call
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
  },
};
</script>

<style scoped>
.v-container {
  background-color: #f4f6f9;
  padding-top: 3rem;
}

.v-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.v-card:hover {
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.25);
  transform: translateY(-5px);
}

.headline {
  font-weight: 600;
  font-size: 1.75rem;
  color: #333333;
  background: linear-gradient(135deg, #7c4dff, #c51162);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subheading {
  font-size: 1.2rem;
  color: #666666;
  margin-top: 0.5rem;
}

.action-btn {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.action-btn:hover {
  background-color: #003c8f;
  transform: translateY(-2px);
}

.search-bar {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.address-card {
  background: linear-gradient(135deg, #e0f7fa, #b2ebf2);
  border-radius: 12px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.address-card img {
  width: 100%;
  border-top: 1px solid #e0e0e0;
}

.back-to-top {
  z-index: 2000;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s ease;
}

.back-to-top:hover {
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4);
}

@media (max-width: 600px) {
  .headline {
    font-size: 1.5rem;
  }
}
</style>
