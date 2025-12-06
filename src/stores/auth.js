import axios from 'axios';
import { defineStore } from 'pinia';

const API = import.meta.env.VITE_API_URL;
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),

  actions: {
    async login(email, password) {
      try {
        const res = await axios.post(`${API}/auth/login`, {
          email,
          password
        });

        this.token = res.data.token;
        this.user = res.data.user;

        localStorage.setItem("token", this.token);

        return res.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    }
  }
});
