import Axios from 'axios'

export const api = Axios.create({
  baseURL: 'http://localhost:3333/api',
})

export const auth = Axios.create({
  baseURL: 'http://localhost:3210/api/auth',
})
