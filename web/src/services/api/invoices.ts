import { axios } from '@/shared/axios'
import { Invoice } from '@/domain/entities'

export const getInvoices = async (): Promise<Invoice[]> => {
  const { data } = await axios.get('/mock/invoices')

  return data
}
