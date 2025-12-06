<template>
  <div>
    <h1>Dashboard</h1>

    <button @click="loadLeads">Load Leads</button>

    <ul>
      <li v-for="lead in leads" :key="lead.id">
        {{ lead.name }} - {{ lead.email }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useLeadsStore } from "../stores/leads";

export default {
  setup() {
    const store = useLeadsStore();

    return {
      leads: store.leads,
      loadLeads: store.fetchLeads
    };
  }
};
</script>
