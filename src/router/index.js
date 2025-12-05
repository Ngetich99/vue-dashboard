import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../views/Dashboard.vue";
import Leads from "../views/Leads.vue";
import Contacts from "../views/Contacts.vue";
import Login from "../views/Login.vue";
import Reminders from "../views/Reminders.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/leads", component: Leads },
  { path: "/contacts", component: Contacts },
  { path: "/login", component: Login },
  { path: "/reminders", component: Reminders },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
