const jwtTokenKey = '@aps:jwt-token'

export const getJwtToken = () => {
  return JSON.parse(localStorage.getItem(jwtTokenKey) || 'undefined')
}

export const setJwtToken = (token: string) => {
  localStorage.setItem(jwtTokenKey, token)
}

export const removeJwtToken = () => {
  localStorage.removeItem(jwtTokenKey)
}
