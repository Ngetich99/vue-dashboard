<template>
  <div>
    <h1>Login Page</h1>
    <button @click="loginUser">Login (demo)</button>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth'

export default {
  name: "Login",
  setup() {
    const auth = useAuthStore()

    const loginUser = () => {
      auth.login({ user: "Demo User", token: "12345" })
      alert(`Logged in as ${auth.user}`)
    }

    return { loginUser }
  }
}
</script>
