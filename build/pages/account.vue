<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">My Account</h2>
    <div v-if="user" class="mb-6">
      <div v-if="!editMode">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Primary Email:</strong> {{ user.email }}</p>
        <button @click="editMode = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
          Edit Profile
        </button>
      </div>
      <form v-else @submit.prevent="updateProfile" class="mb-4">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input v-model="editedName" type="text" id="name" required class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
          Save
        </button>
        <button @click="cancelEdit" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </form>
    </div>
    
    <h3 class="text-xl font-bold mb-2">Additional Emails</h3>
    <ul v-if="user && user.additionalEmails && user.additionalEmails.length" class="mb-4">
      <li v-for="email in user.additionalEmails" :key="email" class="mb-2">
        {{ email }}
        <button @click="removeEmail(email)" class="ml-2 text-red-500 hover:text-red-700">Remove</button>
      </li>
    </ul>
    <p v-else class="mb-4">No additional emails added.</p>
    
    <form @submit.prevent="addEmail" class="mb-6">
      <div class="flex items-center">
        <input v-model="newEmail" type="email" placeholder="Add new email" required class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2">
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Email
        </button>
      </div>
    </form>
    
    <button @click="logout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Logout
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()
const user = ref(null)
const newEmail = ref('')
const editMode = ref(false)
const editedName = ref('')

onMounted(async () => {
  if (authStore.isAuthenticated) {
    user.value = await authStore.getUser()
  } else {
    navigateTo('/login')
  }
})

const addEmail = async () => {
  try {
    await authStore.addEmail(newEmail.value)
    user.value = await authStore.getUser()
    newEmail.value = ''
  } catch (error) {
    console.error('Failed to add email:', error)
    // Handle error (e.g., show error message)
  }
}

const removeEmail = async (email) => {
  try {
    await authStore.removeEmail(email)
    user.value = await authStore.getUser()
  } catch (error) {
    console.error('Failed to remove email:', error)
    // Handle error (e.g., show error message)
  }
}

const updateProfile = async () => {
  try {
    await authStore.updateProfile(editedName.value)
    user.value = await authStore.getUser()
    editMode.value = false
  } catch (error) {
    console.error('Failed to update profile:', error)
    // Handle error (e.g., show error message)
  }
}

const cancelEdit = () => {
  editMode.value = false
  editedName.value = user.value.name
}

const logout = () => {
  authStore.logout()
  navigateTo('/')
}
</script>