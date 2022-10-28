import express, { json } from 'express'
import cors from 'cors'

import { router } from '@/routes'
import { logger } from '@/shared/logger'

import { loggerMiddleware } from '@/middlewares/logger'
import { multerErrorMiddleware } from '@/middlewares/multer'

const app = express()

app.use(cors())
app.use(json())
app.use(loggerMiddleware)

app.use('/', router)
app.use(multerErrorMiddleware)

app.listen(3333, () => logger.info('Server started on port :3333'))
