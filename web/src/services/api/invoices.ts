import { api } from '@/shared/axios'
import { Invoice } from '@/domain/entities'

export const getInvoices = async (): Promise<Invoice[]> => {
  const { data } = await api.get('/invoices')

  return data
}
