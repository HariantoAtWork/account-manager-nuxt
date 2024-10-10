<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-4">Welcome to the Account Manager</h1>
    <p class="mb-4">Manage your account and access multiple applications with ease.</p>
    <div v-if="!isLoggedIn">
      <NuxtLink to="/login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
        Login
      </NuxtLink>
      <NuxtLink to="/register" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Register
      </NuxtLink>
    </div>
    <div v-else>
      <NuxtLink to="/account" class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        Go to My Account
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isAuthenticated)
</script>