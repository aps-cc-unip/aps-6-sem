import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_DATA_API,
})

export const auth = axios.create({
  baseURL: import.meta.env.VITE_APP_AUTH_API,
})

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const clearAuthToken = () => {
  delete api.defaults.headers.common['Authorization']
}
