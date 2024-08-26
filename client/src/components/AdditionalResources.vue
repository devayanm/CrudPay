<template>
    <v-col cols="12">
      <v-card class="elevation-4 rounded-lg" color="white">
        <v-card-title class="headline">
          <v-icon left>mdi-book-outline</v-icon>
          Additional Resources
        </v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="(resource, index) in resources" :key="index" :href="resource.link" target="_blank"
              class="resource-item">
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
          // Add more resources here
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .resource-item {
    cursor: pointer;
    padding: 12px;
  }
  .resource-item:hover {
    background-color: #E0E0E0;
  }
  </style>
  