import { api } from '@/shared/axios'
import { User } from '@/domain/entities'

export const getUsers = async (): Promise<User[]> => {
  const { data } = await api.get('/mock/users')

  return data
}

export const getProfile = async (): Promise<User> => {
  const { data } = await api.get('/mock/profile')

  return data
}
