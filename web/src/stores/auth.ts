import { Role, User } from '@/domain/entities'
import { createBox } from '@/lib/blackbox'

type AuthBoxState = {
  user: Maybe<User>
  validating: boolean
  token: Maybe<string>
}

export const authBox = createBox<AuthBoxState>({
  user: null,
  validating: false,
  token: null,
})

export const setToken = (token: string) => {
  authBox.set({
    token,
  })
}

export const setUser = (user: User) => {
  authBox.set({
    user,
  })
}

export const setValidating = (validating: boolean) => {
  authBox.set({
    validating,
  })
}
