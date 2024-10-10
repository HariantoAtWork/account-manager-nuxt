import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email, password) {
      try {
        const { data } = await useFetch('/api/login', {
          method: 'POST',
          body: { email, password },
        })
        this.setUser(data.value.user, data.value.token)
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    async register(name, email, password) {
      try {
        const { data } = await useFetch('/api/register', {
          method: 'POST',
          body: { name, email, password },
        })
        this.setUser(data.value.user, data.value.token)
      } catch (error) {
        console.error('Registration failed:', error)
        throw error
      }
    },
    async getUser() {
      try {
        const { data } = await useFetch('/api/user', {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.user = data.value
        return this.user
      } catch (error) {
        console.error('Failed to fetch user:', error)
        throw error
      }
    },
    async addEmail(email) {
      try {
        const { data } = await useFetch('/api/user/emails', {
          method: 'POST',
          body: { email },
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.user = data.value
      } catch (error) {
        console.error('Failed to add email:', error)
        throw error
      }
    },
    async removeEmail(email) {
      try {
        const { data } = await useFetch('/api/user/emails', {
          method: 'DELETE',
          body: { email },
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.user = data.value
      } catch (error) {
        console.error('Failed to remove email:', error)
        throw error
      }
    },
    async updateProfile(name) {
      try {
        const { data } = await useFetch('/api/user', {
          method: 'PUT',
          body: { name },
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        this.user = data.value
      } catch (error) {
        console.error('Failed to update profile:', error)
        throw error
      }
    },
    setUser(user, token) {
      this.user = user
      this.token = token
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    initializeFromStorage() {
      if (process.client) {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')
        if (storedUser && storedToken) {
          this.user = JSON.parse(storedUser)
          this.token = storedToken
        }
      }
    },
  },
})