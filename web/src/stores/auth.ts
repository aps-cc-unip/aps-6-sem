import { Role, User } from '@/domain/entities'
import { createBox } from '@/lib/blackbox'
import { getUsers } from '@/services/api/users'

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

export const revalidateAuthState = async (
  token: string,
  callback?: () => void,
) => {
  try {
    const users = await getUsers()

    const user = users[0]

    setUser(user)
    setToken(token)

    if (callback) {
      callback()
    }
  } finally {
    setValidating(false)
  }
}
