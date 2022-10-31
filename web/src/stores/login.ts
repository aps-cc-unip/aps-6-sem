import { createBox } from '@/lib/blackbox'

export const loginFormBox = createBox({
  email: '',
  password: null as Maybe<File>,
})

export function setPassword(password: File) {
  loginFormBox.set({ password })
}

export function setEmail(email: string) {
  loginFormBox.set({ email })
}
