import { defineStore } from 'pinia'
import { api } from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  actions: {
    login(userData) {
      this.user = userData.user
      this.token = userData.token
    },
    logout() {
      this.user = null
      this.token = null
    },
    async fetchUserProfile() {
      try {
        const response = await api.get('/api/profile', {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.user = response.data
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }
  }
})
