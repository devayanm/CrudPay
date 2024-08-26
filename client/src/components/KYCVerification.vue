<template>
  <v-container>
    <v-card class="pa-5 kyc-card" outlined>
      <v-card-title class="headline d-flex align-center">
        KYC Verification
        <v-chip class="ml-auto" :color="kycCompletion === 100 ? 'success' : 'warning'" text-color="white" label>
          KYC {{ kycCompletion }}% Complete
        </v-chip>
      </v-card-title>
      <v-divider class="mb-4"></v-divider>

      <!-- Display KYC Information -->
      <v-card-text v-if="!isEditing">
        <div class="kyc-info">
          <p><v-icon>mdi-account</v-icon> <strong>Full Name:</strong> {{ name }}</p>
          <p><v-icon>mdi-gender-male-female</v-icon> <strong>Gender:</strong> {{ gender }}</p>
          <p><v-icon>mdi-email</v-icon> <strong>Email:</strong> {{ email }}</p>
          <p><v-icon>mdi-phone</v-icon> <strong>Phone Number:</strong> {{ phoneNumber }}</p>
          <p><v-icon>mdi-card-account-details</v-icon> <strong>ID Type:</strong> {{ idType }}</p>
          <p><v-icon>mdi-card-account-details-outline</v-icon> <strong>ID Number:</strong> {{ idNumber }}</p>
          <p><v-icon>mdi-calendar</v-icon> <strong>Date of Birth:</strong> {{ dob }}</p>
          <p><v-icon>mdi-map-marker</v-icon> <strong>Address:</strong> {{ address }}</p>
        </div>
        <v-btn color="primary" @click="isEditing = true" class="edit-btn">Edit</v-btn>
      </v-card-text>

      <!-- KYC Form -->
      <v-card-text v-if="isEditing">
        <v-form ref="form" @submit.prevent="submitKYC" v-model="formValid">
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="name" label="Full Name" required outlined dense :rules="[rules.required]"
                :disabled="loading" aria-label="Full Name"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="gender" :items="['Male', 'Female', 'Other']" label="Gender" required outlined dense
                :rules="[rules.required]" :disabled="loading" aria-label="Gender"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="email" label="Email" required outlined dense :rules="[rules.required, rules.email]"
                :disabled="loading" aria-label="Email"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="phoneNumber" label="Phone Number" required outlined dense
                :rules="[rules.required, rules.phone]" :disabled="loading" aria-label="Phone Number"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select v-model="idType" :items="['Passport', 'Driver’s License', 'National ID']" label="ID Type"
                required outlined dense :rules="[rules.required]" :disabled="loading" aria-label="ID Type"></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="idNumber" label="ID Number" required outlined dense
                :rules="[rules.required, rules.idNumber]" :disabled="loading" aria-label="ID Number"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="dob" label="Date of Birth" required outlined dense
                :rules="[rules.required, rules.date]" :disabled="loading" aria-label="Date of Birth"></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="address" label="Address" required outlined dense
                :rules="[rules.required, rules.address]" :disabled="loading" aria-label="Address"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-file-input v-model="documents" label="Upload ID and Proof of Address" multiple dense required
                accept="image/*,.pdf" :rules="[rules.required]" :disabled="loading"
                aria-label="Upload Documents"></v-file-input>
              <v-row v-if="documents.length">
                <v-col v-for="(doc, index) in documents" :key="index" cols="12" md="4">
                  <v-img v-if="isImage(doc)" :src="doc" alt="Uploaded document preview" contain
                    class="document-preview"></v-img>
                  <v-icon v-else class="file-icon">mdi-file-document</v-icon>
                  <p class="document-name">{{ doc.name }}</p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-btn type="submit" color="success" class="save-btn" :disabled="loading || !formValid">
            <v-icon v-if="loading">mdi-loading</v-icon>
            Submit
          </v-btn>
          <v-btn @click="isEditing = false" class="cancel-btn" :disabled="loading">Cancel</v-btn>
        </v-form>
      </v-card-text>

      <!-- Alerts -->
      <v-alert v-if="error" type="error" class="mt-3">{{ error }}</v-alert>
      <v-alert v-if="loading" type="info" class="mt-3">Submitting your KYC data...</v-alert>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'KYCVerification',
  data() {
    return {
      isEditing: false,
      formValid: false,
      name: '',
      gender: '',
      email: '',
      phoneNumber: '',
      idType: '',
      idNumber: '',
      dob: '',
      address: '',
      documents: [],
      loading: false,
      error: null,
      rules: {
        required: value => !!value || 'This field is required.',
        email: value => /.+@.+\..+/.test(value) || 'Email must be valid.',
        phone: value => /^\+?[0-9]{7,15}$/.test(value) || 'Phone number must be valid.',
        idNumber: value => /^[a-zA-Z0-9]{6,12}$/.test(value) || 'ID number must be valid (6-12 characters).',
        date: value => /^\d{4}-\d{2}-\d{2}$/.test(value) || 'Date must be valid (YYYY-MM-DD).',
        address: value => value && value.length > 5 || 'Address must be at least 5 characters.'
      }
    };
  },
  computed: {
    kycCompletion() {
      let completion = 0;
      if (this.name) completion += 10;
      if (this.gender) completion += 10;
      if (this.email) completion += 10;
      if (this.phoneNumber) completion += 10;
      if (this.idType) completion += 10;
      if (this.idNumber) completion += 10;
      if (this.dob) completion += 10;
      if (this.address) completion += 10;
      if (this.documents.length) completion += 20;
      return completion;
    }
  },
  methods: {
    isImage(file) {
      return file.type.includes('image');
    },
    async submitKYC() {
      if (this.$refs.form.validate()) {
        try {
          this.loading = true;
          // Simulate KYC submission logic
          await new Promise(resolve => setTimeout(resolve, 2000));
          this.$emit('kyc-submitted');
          this.isEditing = false;
        } catch (error) {
          this.error = 'Failed to submit KYC. Please try again later.';
          console.error('KYC submission failed:', error);
        } finally {
          this.loading = false;
        }
      }
    }
  }
};
</script>

<style scoped>
.kyc-card {
  max-width: 700px;
  margin: auto;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
}

.v-card-title {
  font-weight: bold;
  font-size: 1.8rem;
  color: #673ab7;
}

.kyc-info p {
  color: #333;
  font-size: 1rem;
  margin-bottom: 8px;
}

.kyc-info v-icon {
  color: #673ab7;
  margin-right: 8px;
}

.save-btn {
  background-color: #4caf50;
  color: #fff;
}

.cancel-btn {
  background-color: #f44336;
  color: #fff;
}

.v-btn {
  margin-top: 10px;
}

.progress-bar {
  width: 100%;
  max-width: 300px;
  margin-right: 16px;
}

.document-preview {
  max-width: 100%;
  height: 120px;
  object-fit: cover;
}

.document-name {
  text-align: center;
  font-size: 0.85rem;
  margin-top: 8px;
  color: #555;
}

.file-icon {
  font-size: 3rem;
  color: #555;
}
</style>
