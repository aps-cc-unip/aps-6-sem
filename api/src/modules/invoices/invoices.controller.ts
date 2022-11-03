import { Router } from 'express'
import { getInvoices } from '@/modules/invoices/invoices.service'
import { requiresAuth } from '@/middlewares/auth.middleware'

export const invoicesRouter = Router()

invoicesRouter.get('/', requiresAuth('DIRECTOR'), async (req, res) => {
  const invoices = await getInvoices()
  return res.status(200).json(invoices)
})
