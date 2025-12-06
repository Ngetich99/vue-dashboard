<template>
  <div>
    <h1>Dashboard</h1>

    <button @click="loadLeads">Load Leads</button>

    <!-- Show loading message -->
    <p v-if="loading">Loading leads...</p>

    <!-- Show error if API fails -->
    <p v-if="error" style="color:red">{{ error }}</p>

    <!-- Show leads list -->
    <ul v-if="store.leads.length > 0">
      <li v-for="lead in store.leads" :key="lead.id">
        {{ lead.name }} — {{ lead.email }}
      </li>
    </ul>

    <p v-else-if="!loading">No leads found.</p>

    <h2>Add Lead</h2>
    <form @submit.prevent="addNewLead">
      <input v-model="name" placeholder="Name" required />
      <input v-model="email" placeholder="Email" required />
      <button type="submit">Add Lead</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useLeadsStore } from "../stores/leads";

const store = useLeadsStore();
const loading = ref(false);
const error = ref(null);
const name = ref("");
const email = ref("");

// Function to load leads
const loadLeads = async () => {
  loading.value = true;
  error.value = null;
  try {
    await store.fetchLeads();
  } catch (err) {
    error.value = "Failed to load leads. Check backend connection.";
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Automatically load leads when dashboard mounts
onMounted(() => {
  loadLeads();
});

// Function to add a new lead
const addNewLead = async () => {
  if (!name.value || !email.value) return;

  try {
    await store.addLead({ name: name.value, email: email.value });
    name.value = "";
    email.value = "";
  } catch (err) {
    error.value = "Failed to add lead. Check backend connection.";
    console.error(err);
  }
};
</script>
