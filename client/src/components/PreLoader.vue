<template>
  <div v-if="isLoading" class="preloader">
    <div class="loader-container">
      <div class="outer-circle">
        <div class="middle-circle">
          <div class="inner-circle">
            <v-icon class="icon" size="50">mdi-currency-btc</v-icon>
          </div>
        </div>
      </div>
      <div class="loading-bar-container">
        <div class="loading-bar">
          <div class="loading-progress" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
      <p class="loading-text">{{ loadingText }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreLoader',
  data() {
    return {
      isLoading: true,
      loadingText: 'Initializing Secure Payment System...',
      progress: 0,
    };
  },
  mounted() {
    this.startLoading();
  },
  methods: {
    startLoading() {
      // Simulate loading progress
      let progressInterval = setInterval(() => {
        if (this.progress < 100) {
          this.progress += 1;
        } else {
          clearInterval(progressInterval);
          this.isLoading = false;
        }
      }, 30); // Adjust the speed of the progress bar
    },
  },
};
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulsate {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.2);
    opacity: 0.6;
  }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes loading-bar {
  0% { width: 0%; }
  100% { width: 100%; }
}

.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.outer-circle, .middle-circle, .inner-circle {
  border-radius: 50%;
  position: absolute;
}

.outer-circle {
  width: 100px;
  height: 100px;
  border: 6px solid #1976D2;
  border-top: 6px solid transparent; /* Create the spinning effect */
  animation: spin 1.5s linear infinite;
}

.middle-circle {
  width: 80px;
  height: 80px;
  border: 6px solid #424242;
  border-top: 6px solid transparent; /* Create the spinning effect */
  animation: spin 2s linear infinite reverse;
}

.inner-circle {
  width: 60px;
  height: 60px;
  border: 6px solid #82B1FF;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulsate 1.5s ease-in-out infinite;
}

.icon {
  color: #E0E0E0;
  animation: spin 3s linear infinite; /* Rotate the icon */
}

.loading-bar-container {
  position: absolute;
  bottom: -30px; /* Adjust based on circle size and spacing */
  width: 200px;
  height: 4px;
  background-color: transparent;
  z-index: 1;
}

.loading-bar {
  width: 100%;
  height: 100%;
  background-color: #424242;
  border-radius: 2px;
  overflow: hidden;
}

.loading-progress {
  height: 100%;
  background-color: #4CAF50;
  animation: loading-bar 3s infinite;
}

.loading-text {
  margin-top: 120px;
  font-size: 1.2rem;
  color: #E0E0E0;
  text-align: center;
  animation: fadeInOut 3s linear infinite;
}
</style>
