<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>

    <!-- Load leads -->
    <button @click="loadLeads" :disabled="loading">
      {{ loading ? 'Loading...' : 'Load Leads' }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Add new lead form -->
    <div class="add-lead">
      <h2>Add New Lead</h2>
      <form @submit.prevent="submitLead">
        <input v-model="name" type="text" placeholder="Name" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <select v-model="status" required>
          <option value="">Select Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
        </select>
        <button type="submit">Add Lead</button>
      </form>
    </div>

    <!-- Leads table -->
    <table v-if="leads.length" class="leads-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lead in leads" :key="lead.id">
          <td>{{ lead.id }}</td>
          <td>{{ lead.name }}</td>
          <td>{{ lead.email }}</td>
          <td>{{ lead.status }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>No leads loaded yet.</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useLeadsStore } from '../stores/leads'

export default {
  setup() {
    const leadsStore = useLeadsStore()

    // Form fields
    const name = ref('')
    const email = ref('')
    const status = ref('')

    // Load leads from backend
    const loadLeads = async () => {
      await leadsStore.fetchLeads()
    }

    // Submit new lead
    const submitLead = async () => {
      if (!name.value || !email.value || !status.value) return
      await leadsStore.addLead({
        name: name.value,
        email: email.value,
        status: status.value
      })
      // Clear form
      name.value = ''
      email.value = ''
      status.value = ''
    }

    return {
      leads: leadsStore.leads,
      loading: leadsStore.loading,
      error: leadsStore.error,
      loadLeads,
      name,
      email,
      status,
      submitLead
    }
  }
}
</script>

<style scoped>
.dashboard-container {
  padding: 2rem;
  background-color: #f1f5f9;
  min-height: 100vh;
}

h1, h2 {
  color: #1e293b;
}

.error {
  color: red;
  margin-top: 0.5rem;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.add-lead {
  margin-top: 2rem;
}

.add-lead form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.add-lead input,
.add-lead select,
.add-lead button {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.leads-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
}

.leads-table th,
.leads-table td {
  padding: 0.5rem;
  border: 1px solid #ccc;
  text-align: left;
}

.leads-table th {
  background-color: #2563eb;
  color: white;
}

.leads-table tr:nth-child(even) {
  background-color: #e2e8f0;
}
</style>
