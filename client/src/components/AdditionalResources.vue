<template>
  <v-col cols="12">
    <v-card class="resource-card elevation-4 rounded-lg" color="white">
      <v-card-title class="headline">
        <v-icon size="large" class="mr-3">mdi-book-outline</v-icon>
        Additional Resources
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item
            v-for="(resource, index) in resources"
            :key="index"
            :href="resource.link"
            target="_blank"
            class="resource-item"
          >
            <v-list-item-content>
              <v-list-item-title>{{ resource.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ resource.description }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon>mdi-open-in-new</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      resources: [
        { title: 'User Guide', description: 'Comprehensive guide for using CrudPay', link: 'https://example.com/user-guide' },
        { title: 'API Documentation', description: 'Detailed API documentation for developers', link: 'https://example.com/api-docs' },
        { title: 'Getting Started', description: 'Quick start guide for new users', link: 'https://example.com/getting-started' },
        { title: 'Integration Guide', description: 'How to integrate with third-party services', link: 'https://example.com/integration-guide' },
        { title: 'Troubleshooting', description: 'Solutions to common issues', link: 'https://example.com/troubleshooting' },
        { title: 'FAQ', description: 'Frequently asked questions and answers', link: 'https://example.com/faq' },
        { title: 'API Rate Limits', description: 'Information on API usage limits', link: 'https://example.com/api-rate-limits' },
        { title: 'Security Best Practices', description: 'Best practices for securing your account', link: 'https://example.com/security-best-practices' }
      ],
    };
  },
};
</script>

<style scoped>
.resource-card {
  background: linear-gradient(135deg, #e3f2fd, #bbdefb);
  border-radius: 12px;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.headline {
  font-weight: 700;
  font-size: 1.875rem;
  color: #0277bd;
  background: linear-gradient(45deg, #01579b, #0288d1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-bottom: 2px solid #01579b;
}

.resource-item {
  cursor: pointer;
  padding: 12px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border-bottom: 1px solid #e0e0e0;
}

.resource-item:hover {
  background-color: #e1f5fe;
  transform: translateY(-2px);
}

.resource-item:last-child {
  border-bottom: none;
}

.v-list-item-title {
  font-weight: 600;
}

.v-list-item-subtitle {
  color: #555;
}
</style>
