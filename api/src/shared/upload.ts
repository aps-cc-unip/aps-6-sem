import multer, { diskStorage } from 'multer'

export class MimeTypeError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MimeTypeError'
  }
}

export const imageUpload = multer({
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/image\/png|image\/jpe?g/)) {
      return callback(new MimeTypeError('Only images are allowed'))
    }

    callback(null, true)
  },
  storage: diskStorage({
    destination: 'uploads',
  }),
})
