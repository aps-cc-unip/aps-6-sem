import { api } from '@/shared/axios'
import { Task } from '@/domain/entities'

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await api.get('/tasks')

  return data
}
