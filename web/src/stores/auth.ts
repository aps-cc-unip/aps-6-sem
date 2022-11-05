import { User } from '@/domain/entities'
import { createBox } from '@/lib/blackbox'
import { getProfile } from '@/services/api/users'

type AuthBoxState = {
  user: Maybe<User>
  validating: boolean
  token: Maybe<string>
}

export const authBox = createBox<AuthBoxState>({
  user: null,
  validating: true,
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

export const revalidateAuthState = async (
  token: string,
  callback?: () => void,
) => {
  try {
    const user = await getProfile()

    setUser(user)
    setToken(token)

    if (callback) {
      callback()
    }

    setValidating(false)
  } finally {
    setValidating(false)
  }
}
