import ky from 'ky'

const kyGetErrorMessage = {
  beforeError: [
    async (error) => {
      const { response } = error
      if (response && response.body) {
        try {
          const body = await response.json()
          // eslint-disable-next-line no-param-reassign
          error.message = `${body.message} (${response.status})`
        } catch (jsonError) {
          return error
        }
      }
      return error
    },
  ],
}

const getTokenFromLS = () => {
  const tokenLS = window.localStorage.getItem('access_token')
  if (tokenLS) {
    return JSON.parse(tokenLS).state.accessToken
  }
  return null
}

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.headers = {
      'Content-Type': 'application/json',
    }
    this.kyInstance = ky.create({ headers: this.headers, hooks: kyGetErrorMessage })
    this.checkAndRenewToken = async (request) => {
      const { accessToken } = await ky.get(`${this.baseUrl}/api/v1/auth/refresh`, { credentials: 'include' }).json()
      request.headers.set('Authorization', `Bearer ${accessToken}`)
    }
    this.accessToken = getTokenFromLS()
    this.authHeaders = this.accessToken ? {
      ...this.headers,
      Authorization: `Bearer ${this.accessToken}`,
    } : null
    this.kyAuthInstance = this.accessToken
      ? ky.create({
        headers: this.authHeaders,
        credentials: 'include',
        hooks: { ...kyGetErrorMessage, beforeRequest: [this.checkAndRenewToken] },
      })
      : null
  }

  setToken = (token) => {
    this.accessToken = token
    this.authHeaders = {
      ...this.headers,
      Authorization: `Bearer ${token}`,
    }

    this.kyAuthInstance = ky.create({ headers: this.authHeaders, credentials: 'include', hooks: { ...kyGetErrorMessage, beforeRequest: [this.checkAndRenewToken] } })
  }

  clearToken = () => {
    this.accessToken = null
    this.authHeaders = null
    this.kyAuthInstance = null
  }

  signUp = (signUpData) => this.kyInstance.post(
    `${this.baseUrl}/api/v1/auth/signup`,
    { body: JSON.stringify(signUpData) },
  )

  signIn = (signInData) => this.kyInstance.post(
    `${this.baseUrl}/api/v1/auth/signin`,
    { body: JSON.stringify(signInData), credentials: 'include' },
  )

  signOut = () => this.kyAuthInstance.post(`${this.baseUrl}/api/v1/auth/signout`)
}

const api = new Api('http://localhost:5050')

export default api
