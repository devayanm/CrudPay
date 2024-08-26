<template>
    <v-btn 
      color="primary" 
      fab 
      @click="openChat" 
      class="floating-chat" 
      elevation="6"
      :style="{ bottom: buttonBottom }"
    >
      <v-icon>mdi-chat</v-icon>
    </v-btn>
  </template>
  
  <script>
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  
  export default {
    setup() {
      const buttonBottom = ref('50px');
  
      const openChat = () => {
        window.open('https://example.com/live-chat', '_blank');
      };
  
      const updateButtonPosition = () => {
        const footer = document.querySelector('footer');
        if (footer) {
          const footerRect = footer.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const footerTop = footerRect.top;
  
          if (footerTop < viewportHeight) {
            buttonBottom.value = `${viewportHeight - footerTop + 20}px`;
          }
        }
      };
  
      onMounted(() => {
        updateButtonPosition();
        window.addEventListener('resize', updateButtonPosition);
        window.addEventListener('scroll', updateButtonPosition);
      });
  
      onBeforeUnmount(() => {
        window.removeEventListener('resize', updateButtonPosition);
        window.removeEventListener('scroll', updateButtonPosition);
      });
  
      return {
        buttonBottom,
        openChat,
      };
    },
  };
  </script>
  
  <style scoped>
  .floating-chat {
    position: fixed;
    right: 50px;
    z-index: 2000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .floating-chat:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }
  </style>
  