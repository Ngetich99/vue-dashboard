import axios from "axios";
import { defineStore } from "pinia";

const API = import.meta.env.VITE_API_BASE_URL;

export const useLeadsStore = defineStore("leads", {
  state: () => ({
    leads: [],
  }),

  actions: {
    async fetchLeads() {
      const res = await axios.get(`${API}/leads`);
      this.leads = res.data;
    },

    async addLead(data) {
      const res = await axios.post(`${API}/leads`, data);
      this.leads.push(res.data);
    }
  }
});
