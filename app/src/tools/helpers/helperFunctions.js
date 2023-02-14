import { ACCESS_TOKEN_LS_KEY } from './storageKeys.js'

export const getTokenFromLS = () => {
  const tokenLS = window.localStorage.getItem(ACCESS_TOKEN_LS_KEY)
  if (tokenLS) {
    return JSON.parse(tokenLS)?.state?.accessToken
  }
  return null
}
export const setTokenToLS = (accessToken) => {
  const state = {
    state: {
      accessToken,
    },
  }
  window.localStorage.setItem(ACCESS_TOKEN_LS_KEY, JSON.stringify(state))
}
