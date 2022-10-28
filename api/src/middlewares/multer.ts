import { MimeTypeError } from '@/shared/upload'
import { Request, Response, NextFunction } from 'express'

export const multerErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MimeTypeError) {
    return res.status(400).json({
      message: err.message,
    })
  }

  return next(err)
}
