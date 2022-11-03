import { api } from '@/shared/axios'
import { Incident } from '@/domain/entities'

export const getIncidents = async (): Promise<Incident[]> => {
  const { data } = await api.get('/incidents')

  return data
}
