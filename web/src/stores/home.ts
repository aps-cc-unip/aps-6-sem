import { createBox } from '@/state/blackbox'

export const formBox = createBox({
  email: '',
  file: null as Maybe<File>,
})

export function setFile(file: File) {
  formBox.set({ file })
}

export function setEmail(email: string) {
  formBox.set({ email })
}
