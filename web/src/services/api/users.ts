import { axios } from '@/shared/axios'
import { User } from '@/domain/entities'

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axios.get('/mock/users')

  return data
}
