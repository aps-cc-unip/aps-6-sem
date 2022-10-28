import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
})

export type Register = z.infer<typeof registerSchema> & {
  password: File
}
