<template>
  <v-row class="button-row" justify="start">
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-col cols="auto" v-bind="attrs" v-on="on">
          <v-btn icon class="nav-button back-button" @click="goBack">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
      </template>
      <span>Go Back</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-col cols="auto" v-bind="attrs" v-on="on">
          <v-btn icon class="nav-button forward-button" @click="goForward">
            <v-icon>mdi-arrow-right</v-icon>
          </v-btn>
        </v-col>
      </template>
      <span>Go Forward</span>
    </v-tooltip>

    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-col cols="auto" v-bind="attrs" v-on="on">
          <v-btn icon class="nav-button refresh-button" @click="refreshPage">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-col>
      </template>
      <span>Refresh</span>
    </v-tooltip>
  </v-row>
</template>

<script>
export default {
  name: 'NavigationButtons',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goForward() {
      this.$router.go(1);
    },
    refreshPage() {
      window.location.reload();
    }
  }
};
</script>

<style scoped>
.button-row {
  position: fixed;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
}

.nav-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s, box-shadow 0.2s;
}

.nav-button:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
}

/* Darker tone color schemes */
.back-button {
  background: linear-gradient(135deg, #2b2b2b, #414141); /* Dark gray gradient for Go Back */
}

.forward-button {
  background: linear-gradient(135deg, #1f3b4d, #2a6478); /* Dark blue gradient for Go Forward */
}

.refresh-button {
  background: linear-gradient(135deg, #4d2a2a, #6b4b4b); /* Dark red gradient for Refresh */
}
</style>
