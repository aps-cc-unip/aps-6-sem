import { Handler } from 'express'

export const validateRequestMiddleware = <T extends Zod.ZodRawShape>(
  payload: 'body' | 'query' | 'params',
  schema: Zod.ZodObject<T>
): Handler => {
  return (req, res, next) => {
    const output = schema.safeParse(req[payload])

    if (output.success) {
      next()
    } else {
      res.status(400).json({
        message: `Bad request, the payload passed inside '${payload}' is not valid`,
        status: 400,
        error: output.error.issues,
      })
    }
  }
}
