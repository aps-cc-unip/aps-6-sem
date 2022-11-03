import Axios from 'axios'

export const api = Axios.create({
  baseURL: 'http://localhost:3333/api',
})

export const auth = Axios.create({
  baseURL: 'http://localhost:3210/api/auth',
})

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export const clearAuthToken = () => {
  delete api.defaults.headers.common['Authorization']
}
