<template>
  <div>
    <nav>
      <router-link to="/">Dashboard</router-link> |
      <router-link to="/leads">Leads</router-link> |
      <router-link to="/contacts">Contacts</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/reminders">Reminders</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {}
</script>

<style>
nav {
  padding: 1rem;
  background-color: #f0f0f0;
}
nav a {
  margin-right: 1rem;
  text-decoration: none;
  color: #333;
}
</style>
