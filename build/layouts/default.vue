<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink to="/" class="flex-shrink-0 flex items-center">
              Account Manager
            </NuxtLink>
          </div>
          <div class="flex items-center">
            <NuxtLink v-if="!isLoggedIn" to="/login" class="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium">
              Login
            </NuxtLink>
            <NuxtLink v-if="!isLoggedIn" to="/register" class="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium">
              Register
            </NuxtLink>
            <NuxtLink v-if="isLoggedIn" to="/account" class="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium">
              My Account
            </NuxtLink>
            <button v-if="isLoggedIn" @click="logout" class="text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-md text-sm font-medium">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const isLoggedIn = computed(() => authStore.isAuthenticated)

const logout = () => {
  authStore.logout()
  navigateTo('/')
}
</script>