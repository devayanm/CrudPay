<template>
    <v-speed-dial v-model:active="fab" direction="top" color="secondary" class="floating-chat">
      <template #activator>
        <v-btn color="primary" fab @click="toggleFab" elevation="6">
          <v-icon>mdi-chat</v-icon>
        </v-btn>
      </template>
      <v-fab-action @click="openChat">
        <v-icon>mdi-chat-outline</v-icon>
      </v-fab-action>
    </v-speed-dial>
  </template>
  
  <script>
  export default {
    data() {
      return {
        fab: false,
      };
    },
    methods: {
      openChat() {
        // Handle opening live chat widget logic here
        window.open('https://example.com/live-chat', '_blank');
      },
      toggleFab() {
        this.fab = !this.fab;
      },
    },
  };
  </script>
  
  <style scoped>
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
  