<template>
  <v-container>
    <v-card class="pa-5 profile-card" outlined>
      <v-card-title class="headline d-flex align-center">
        User Profile
        <v-chip class="ml-auto" :color="profileCompletion === 100 ? 'success' : 'warning'" text-color="white" label>
          Profile {{ profileCompletion }}% Complete
        </v-chip>
      </v-card-title>
      <v-divider class="my-4"></v-divider>
      <v-card-text v-if="!isEditing">
        <v-row align="center" class="mb-4">
          <v-col cols="auto">
            <v-avatar size="100" class="avatar">
              <img :src="user.avatar || defaultAvatar" alt="User Avatar" />
            </v-avatar>
          </v-col>
          <v-col>
            <div>
              <p class="profile-info"><v-icon>mdi-account</v-icon> <strong>Name:</strong> {{ user.name }}</p>
              <p class="profile-info"><v-icon>mdi-email</v-icon> <strong>Email:</strong> {{ user.email }}</p>
              <p class="profile-info"><v-icon>mdi-phone</v-icon> <strong>Phone Number:</strong> {{ user.phone }}</p>
              <p class="profile-info"><v-icon>mdi-calendar-clock</v-icon> <strong>Last Login:</strong> {{ user.lastLogin
                }}</p>
              <p class="profile-info"><v-icon>mdi-wallet</v-icon> <strong>Wallet Address:</strong> {{ user.walletAddress
                }}</p>
            </div>
          </v-col>
        </v-row>
        <v-btn color="primary" @click="editProfile" class="edit-btn">Edit</v-btn>
      </v-card-text>
      <v-card-text v-if="isEditing">
        <v-form ref="form" v-model="formValid" @submit.prevent="confirmSave">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="user.name" label="Name" :rules="[rules.required]" required outlined
                dense></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="user.email" label="Email" :rules="[rules.required, rules.email]" required outlined
                dense></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="user.phone" label="Phone Number" :rules="[rules.phone]" outlined
                dense></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="user.walletAddress" label="Wallet Address" outlined dense></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-4">
            <v-col cols="12">
              <v-file-input v-model="avatarFile" label="Upload New Avatar" accept="image/*" dense outlined
                prepend-icon="mdi-camera"></v-file-input>
            </v-col>
          </v-row>
          <v-btn type="submit" color="success" class="save-btn" :disabled="loading || !formValid">
            <v-icon v-if="loading">mdi-loading</v-icon>
            Save
          </v-btn>
          <v-btn @click="confirmCancel" class="cancel-btn">Cancel</v-btn>
        </v-form>
      </v-card-text>
      <v-alert v-if="error" type="error" class="mt-3">{{ error }}</v-alert>
      <v-alert v-if="loading && !isEditing" type="info" class="mt-3">Loading user data...</v-alert>
    </v-card>

    <!-- Confirmation Dialog for Save -->
    <v-dialog v-model="saveDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Save</v-card-title>
        <v-card-text>Are you sure you want to save these changes?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="saveProfile">Yes</v-btn>
          <v-btn color="red darken-1" text @click="saveDialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Confirmation Dialog for Cancel -->
    <v-dialog v-model="cancelDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirm Cancel</v-card-title>
        <v-card-text>Are you sure you want to discard your changes?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="cancelEdit">Yes</v-btn>
          <v-btn color="red darken-1" text @click="cancelDialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      isEditing: false,
      formValid: false,
      saveDialog: false,
      cancelDialog: false,
      avatarFile: null,
      defaultAvatar: 'https://via.placeholder.com/100',
      user: {
        name: '',
        email: '',
        phone: '',
        walletAddress: '',
        avatar: '',
        lastLogin: 'N/A'
      },
      loading: false,
      error: null,
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
        phone: value => /^\+?\d{10,15}$/.test(value) || 'Phone number must be valid (10-15 digits).'
      }
    };
  },
  computed: {
    profileCompletion() {
      let completion = 0;
      if (this.user.name) completion += 25;
      if (this.user.email) completion += 25;
      if (this.user.phone) completion += 25;
      if (this.user.walletAddress) completion += 25;
      return completion;
    }
  },
  methods: {
    async fetchUserProfile() {
      try {
        this.loading = true;
        const user = await this.$store.dispatch('auth/fetchUserProfile');
        this.user = user || { name: '', email: '', phone: '', walletAddress: '', avatar: '', lastLogin: 'N/A' };
      } catch (error) {
        this.error = 'Failed to fetch user profile. Please try again later.';
        console.error('Failed to fetch user profile:', error);
      } finally {
        this.loading = false;
      }
    },
    editProfile() {
      this.isEditing = true;
    },
    confirmSave() {
      this.saveDialog = true;
    },
    confirmCancel() {
      this.cancelDialog = true;
    },
    async saveProfile() {
      this.saveDialog = false;
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          if (this.avatarFile) {
            // Handle avatar upload logic here if needed
            const avatarUrl = await this.uploadAvatar(this.avatarFile);
            this.user.avatar = avatarUrl;
          }
          await this.$store.dispatch('auth/updateProfile', this.user);
          this.$emit('profile-updated');
          this.isEditing = false;
        } catch (error) {
          this.error = 'Failed to update profile. Please try again later.';
          console.error('Failed to update profile:', error);
        } finally {
          this.loading = false;
        }
      }
    },
    cancelEdit() {
      this.cancelDialog = false;
      this.isEditing = false;
      this.fetchUserProfile();
    },
    async uploadAvatar(file) {
      // Simulated upload function, replace with real implementation
      return new Promise((resolve) => {
        setTimeout(() => resolve(URL.createObjectURL(file)), 1000);
      });
    }
  },
  async created() {
    this.fetchUserProfile();
  }
};
</script>

<style scoped>
.profile-card {
  max-width: 650px;
  margin: auto;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #f5f5f5, #e0e0e0);
}

.v-card-title {
  font-weight: bold;
  font-size: 1.8rem;
  color: #007bff;
}

.profile-info {
  color: #333;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.profile-info v-icon {
  color: #007bff;
  margin-right: 8px;
}

.avatar {
  border: 4px solid #007bff;
  border-radius: 50%;
}

.edit-btn,
.save-btn,
.cancel-btn {
  font-weight: bold;
  border-radius: 25px;
}

.edit-btn {
  margin-top: 10px;
  background-color: #007bff;
  color: white;
}

.save-btn {
  margin-top: 20px;
  background-color: #28a745;
  color: white;
}

.cancel-btn {
  margin-top: 20px;
  background-color: #dc3545;
  color: white;
}

.v-card-text {
  margin-top: 20px;
}
</style>
