<template>
  <div>
    <h1>Dashboard</h1>

    <button @click="loadLeads">Load Leads</button>

    <ul>
      <li v-for="lead in leads" :key="lead.id">
        {{ lead.name }} — {{ lead.email }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useLeadsStore } from "../stores/leads"

const store = useLeadsStore()

const leads = store.leads
const loadLeads = store.fetchLeads
</script>
