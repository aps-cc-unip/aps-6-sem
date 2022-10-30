import { axios } from '@/shared/axios'
import { Task } from '@/domain/entities'

export const getTasks = async (): Promise<Task[]> => {
  const { data } = await axios.get('/mock/tasks')

  return data
}
