import { auth } from '@/shared/axios'

export const login = async (login: FormData): Promise<{ token: string }> => {
  const { data } = await auth.post('/auth/login', login)
  return data
}

export const register = async (login: FormData): Promise<void> => {
  await auth.post('/auth/register', login)
}
