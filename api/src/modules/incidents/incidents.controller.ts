import { Router } from 'express'
import { requiresAuth } from '@/middlewares/auth.middleware'
import { getIncidents } from '@/modules/incidents/incidents.service'

export const incidentsRouter = Router()

incidentsRouter.get('/', requiresAuth('MINISTER'), async (req, res) => {
  const incidents = await getIncidents()

  res.status(200).json(incidents)
})
