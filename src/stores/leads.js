import { defineStore } from 'pinia'
import { api } from '../services/api'

export const useLeadsStore = defineStore('leads', {
  state: () => ({
    leads: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchLeads() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/api/leads')
        this.leads = response.data
      } catch (err) {
        this.error = err.message || 'Failed to fetch leads'
      } finally {
        this.loading = false
      }
    },
    async addLead(newLead) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/api/leads', newLead)
        this.leads.push(response.data) // Add new lead to store
      } catch (err) {
        this.error = err.message || 'Failed to add lead'
      } finally {
        this.loading = false
      }
    }
  }
})
