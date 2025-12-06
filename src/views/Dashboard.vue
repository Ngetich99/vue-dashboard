<template>
  <div class="dashboard">
    <h1>Dashboard</h1>

    <!-- Loading state -->
    <div v-if="loading">Loading leads...</div>

    <!-- Error state -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- No leads state -->
    <div v-if="!loading && leads.length === 0 && !error">No leads found.</div>

    <!-- Leads list -->
    <ul v-if="!loading && leads.length > 0">
      <li v-for="lead in leads" :key="lead.id">
        {{ lead.name }} - {{ lead.email }}
      </li>
    </ul>

    <!-- Add Lead Form -->
    <h2>Add Lead</h2>
    <form @submit.prevent="addLead">
      <input v-model="newLead.name" placeholder="Name" required />
      <input v-model="newLead.email" placeholder="Email" required />
      <button type="submit" :disabled="addingLead">
        {{ addingLead ? "Adding..." : "Add Lead" }}
      </button>
    </form>

    <!-- Success message -->
    <div v-if="success" class="success">{{ success }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Make sure your Vercel env variable is set
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const leads = ref([]);
const loading = ref(false);
const error = ref(null);
const success = ref(null);
const addingLead = ref(false);

const newLead = ref({
  name: "",
  email: "",
});

// Fetch leads from backend
const fetchLeads = async () => {
  loading.value = true;
  error.value = null;
  success.value = null;
  try {
    const response = await axios.get(`${API_BASE_URL}/api/leads/`);
    leads.value = response.data;
  } catch (err) {
    console.error("Fetch leads error:", err.response || err.message);
    error.value = "Failed to fetch leads. Check backend connection.";
  } finally {
    loading.value = false;
  }
};

// Add a new lead
const addLead = async () => {
  if (!newLead.value.name || !newLead.value.email) return;

  addingLead.value = true;
  error.value = null;
  success.value = null;

  try {
    const response = await axios.post(`${API_BASE_URL}/api/leads/`, newLead.value);
    leads.value.unshift(response.data); // add to top of list
    newLead.value.name = "";
    newLead.value.email = "";
    success.value = "Lead added successfully!";
  } catch (err) {
    console.error("Add lead error:", err.response || err.message);
    error.value = err.response?.data?.message || "Failed to add lead. Check backend connection.";
  } finally {
    addingLead.value = false;
  }
};

// Auto-load leads on component mount
onMounted(fetchLeads);
</script>

<style scoped>
.dashboard {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.error {
  color: red;
  margin-bottom: 10px;
}

.success {
  color: green;
  margin-bottom: 10px;
}

form input {
  display: block;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
