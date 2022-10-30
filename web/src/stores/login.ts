import { createBox } from '@/lib/blackbox'

export const loginFormBox = createBox({
  email: '',
  file: null as Maybe<File>,
})

export function setFile(file: File) {
  loginFormBox.set({ file })
}

export function setEmail(email: string) {
  loginFormBox.set({ email })
}
