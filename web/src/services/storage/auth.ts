const jwtTokenKey = '@aps:jwt-token'

export const getJwtToken = () => {
  return localStorage.getItem(jwtTokenKey)
}

export const setJwtToken = (token: string) => {
  localStorage.setItem(jwtTokenKey, token)
}

export const removeJwtToken = () => {
  localStorage.removeItem(jwtTokenKey)
}