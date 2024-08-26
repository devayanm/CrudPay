<template>
  <v-container fluid class="features-container">
    <NavigationButtons />
    <!-- Hero Section -->
    <v-row class="hero-section d-flex align-center justify-center">
      <v-col cols="12" class="text-center">
        <h1 class="hero-title">Explore Our Features</h1>
        <p class="hero-subtitle">
          Discover the extensive range of capabilities we offer to enhance your
          experience.
        </p>
      </v-col>
    </v-row>

    <!-- Feature Highlights -->
    <v-row class="d-flex justify-center mt-5">
      <v-col cols="12" md="10">
        <v-row>
          <v-col cols="12" sm="6" md="4" lg="3" v-for="feature in features" :key="feature.title">
            <v-card class="feature-card" @click="openFeature(feature)">
              <v-icon class="feature-icon">{{ feature.icon }}</v-icon>
              <v-card-title class="feature-card-title">{{
                feature.title
              }}</v-card-title>
              <v-card-subtitle class="feature-card-subtitle">{{
                feature.description
              }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Testimonials Section -->
    <v-row class="d-flex justify-center mt-5">
      <v-col cols="12" md="10">
        <v-card class="testimonials-card">
          <v-card-title class="testimonials-title">What Our Users Say</v-card-title>
          <v-card-text>
            <v-carousel v-model="carouselModel" cycle hide-delimiter-background show-arrows-on-hover
              class="testimonials-carousel" :interval="5000" height="auto">
              <v-carousel-item v-for="(testimonial, index) in chunkedTestimonials" :key="index" class="carousel-item">
                <div class="testimonial-group">
                  <v-card v-for="(item, idx) in testimonial" :key="idx" class="testimonial-card">
                    <v-card-text class="testimonial-text">
                      {{ item.text }}
                    </v-card-text>
                    <v-card-title class="testimonial-author">
                      - {{ item.author }}
                    </v-card-title>
                  </v-card>
                </div>
              </v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Additional Features Section -->
    <v-row class="d-flex justify-center mt-5">
      <v-col cols="12" md="10">
        <v-card class="additional-features-card">
          <v-card-title class="additional-features-title">More Features</v-card-title>
          <v-card-text>
            <v-list dense>
              <v-list-item v-for="feature in additionalFeatures" :key="feature.title">
                <v-list-item-icon>
                  <v-icon>{{ feature.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ feature.title }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    feature.description
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Call to Action -->
    <v-row class="d-flex justify-center mt-5">
      <v-col cols="12" md="6" class="text-center">
        <v-btn color="primary" large @click="ctaAction">Get Started</v-btn>
      </v-col>
    </v-row>

    <!-- Modals for Feature Details -->
    <v-dialog v-model="featureDialog" max-width="800px">
      <v-card>
        <v-card-title class="modal-title">{{
          selectedFeature.title
        }}</v-card-title>
        <v-card-text>
          <p>{{ selectedFeature.details }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="featureDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "FeaturesView",
  data() {
    return {
      featureDialog: false,
      selectedFeature: {},
      carouselModel: 0,
      features: [
        {
          title: "Crypto Payment Integration",
          description:
            "Accept payments in multiple cryptocurrencies. Automatic conversion between crypto and fiat currencies.",
          icon: "mdi-bitcoin",
          details:
            "E-commerce Integration: Accept payments in multiple cryptocurrencies. Merchants can choose to receive payments in either crypto or INR. Flexible Payment Options: Automatic conversion between crypto and fiat currencies ensures convenience and flexibility for sellers.",
        },
        {
          title: "Off-Ramping & On-Ramping",
          description:
            "Convert crypto to INR and vice versa. Effortless transaction management.",
          icon: "mdi-arrow-right",
          details:
            "Off-Ramping: Convert crypto to INR effortlessly. Receive fiat payouts with timely and accurate processing. On-Ramping: Transform INR into crypto seamlessly. Simplify buying and transferring digital assets.",
        },
        {
          title: "Standalone Payment Gateway",
          description:
            "Use a standalone gateway or UPI app for non-integrated sites.",
          icon: "mdi-credit-card-multiple",
          details:
            "Non-Integrated Processing: For e-commerce sites not integrated with CrudPay, use a standalone gateway or UPI app. Convert crypto payments to INR for processing.",
        },
        {
          title: "Comprehensive Crypto App Features",
          description:
            "Secure wallet management, UPI-like functionality, and robust KYC processes.",
          icon: "mdi-lock",
          details:
            "Wallet Functionality: Secure storage and management of multiple cryptocurrencies. Track your transaction history with ease. Crypto UPI-Like Functionality: Enjoy instant transfers and QR code payments, similar to UPI. User Accounts & Verification: Robust KYC processes and secure account management. Integration with Financial Services: Link with bank accounts and other payment methods for a seamless experience. Advanced Security Measures: 2FA, anti-fraud protocols, and top-notch security practices to protect your data and funds. Customer Support & Reporting: In-app support, tax reporting, and a detailed help center for all your needs.",
        },
      ],
      additionalFeatures: [
        {
          title: "Global Payment Acceptance",
          description:
            "Accept payments from around the world in multiple currencies.",
          icon: "mdi-earth",
        },
        {
          title: "Advanced Analytics",
          description:
            "Gain insights into transaction patterns and user behavior.",
          icon: "mdi-chart-line",
        },
        {
          title: "Enhanced Security",
          description:
            "State-of-the-art security measures to protect transactions and user data.",
          icon: "mdi-shield-lock",
        },
        {
          title: "Comprehensive Reporting",
          description:
            "Access detailed reports and transaction summaries for better financial management.",
          icon: "mdi-file-chart",
        },
      ],
      testimonials: [
        {
          author: "John Doe",
          text: "This is an amazing service. It has transformed the way I do my business!",
        },
        {
          author: "Jane Smith",
          text: "The features are fantastic and the support team is top-notch.",
        },
        {
          author: "Alice Johnson",
          text: "A game-changer for crypto payments. Seamless and secure!",
        },
        {
          author: "Bob Brown",
          text: "Excellent integration with my e-commerce platform. Highly recommend!",
        },
        {
          author: "Charlie Adams",
          text: "Superb user experience and reliable service. Very satisfied!",
        },
        {
          author: "Diana Harris",
          text: "Their payment solutions have simplified our transactions. Great job!",
        },
        {
          author: "Evan Lee",
          text: "Trustworthy and efficient. Perfect for our crypto payment needs.",
        },
        {
          author: "Fiona Green",
          text: "Highly customizable and easy to use. Our go-to payment platform.",
        },
        {
          author: "George Walker",
          text: "Their customer support is always responsive and helpful.",
        },
        {
          author: "Hannah Thompson",
          text: "Innovative features and seamless integration. Love it!",
        },
        {
          author: "Ian Scott",
          text: "Fantastic platform for managing crypto payments. Highly recommend!",
        },
        {
          author: "Julia White",
          text: "Smooth transactions and excellent security. Couldn't ask for more.",
        },
      ],
    };
  },
  computed: {
    chunkedTestimonials() {
      const chunkSize = 3;
      const chunks = [];
      for (let i = 0; i < this.testimonials.length; i += chunkSize) {
        chunks.push(this.testimonials.slice(i, i + chunkSize));
      }
      return chunks;
    },
  },
  methods: {
    openFeature(feature) {
      this.selectedFeature = feature;
      this.featureDialog = true;
    },
    ctaAction() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>

<style scoped>
.features-container {
  padding: 20px;
}

.hero-section {
  margin-bottom: 40px;
  color: #ffffff;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  /* color: #2c3e50; */
  margin-bottom: 10px;
}

.hero-subtitle {
  font-size: 1.15rem;
  /* color: #7f8c8d; */
}

.feature-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  padding: 20px;
  color: #ffffff;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  font-size: 3rem;
  color: #1976d2;
  margin-bottom: 10px;
}

.feature-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  /* color: #2c3e50; */
  margin-bottom: 5px;
}

.feature-card-subtitle {
  font-size: 0.875rem;
  /* color: #7f8c8d; */
}

.testimonials-card {
  border-radius: 12px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  height: 400px;
  color: #ffffff;
}

.testimonials-title {
  font-size: 1.5rem;
  font-weight: 600;
  /* color: #2c3e50; */
  margin-bottom: 20px;
}

.testimonials-carousel {
  height: auto;
}

.carousel-item {
  display: flex;
  justify-content: center;
}

.testimonial-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.testimonial-card {
  border-radius: 12px;
  padding: 20px;
  background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  margin: 10px;
  flex: 1;
  max-width: 250px;
  height: 250px;
  color: #ffffff;
}

.testimonial-text {
  font-size: 1rem;
  /* color: #2c3e50; */
  margin-bottom: 10px;
}

.testimonial-author {
  font-size: 0.875rem;
  /* color: #7f8c8d; */
  text-align: right;
}

.additional-features-card {
  border-radius: 12px;
  padding: 30px;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.additional-features-title {
  font-size: 1.5rem;
  font-weight: 600;
  /* color: #2c3e50; */
  margin-bottom: 20px;
}



.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
}
</style>
