import ky from 'ky'
import jwt_decode from 'jwt-decode'
import { getTokenFromLS, setTokenToLS } from '../helpers/helperFunctions.js'

const kyGetErrorMessage = {
  beforeError: [
    async (error) => {
      const { response } = error
      if (response && response.body) {
        try {
          const body = await response.json()
          // eslint-disable-next-line no-param-reassign
          error.message = `${body.message} (${response.status})`
          // eslint-disable-next-line no-param-reassign
          error.status = response.status
        } catch (jsonError) {
          return error
        }
      }
      return error
    },
  ],
}

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.headers = {
      'Content-Type': 'application/json',
    }
    this.kyInstance = ky.create({ headers: this.headers, hooks: kyGetErrorMessage })

    this.checkAndRenewToken = async (request) => {
      let { exp } = jwt_decode(this.accessToken)
      const now = Date.now()
      exp *= 1e3
      if (exp <= now) {
        const refreshResponse = await this.refreshTokens()
        const { accessToken } = await refreshResponse.json()
        request.headers.set('Authorization', `Bearer ${accessToken}`)
        this.setToken(accessToken)
      }
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

    this.kyAuthInstance = ky.create({
      headers: this.authHeaders,
      credentials: 'include',
      hooks: { ...kyGetErrorMessage, beforeRequest: [this.checkAndRenewToken] },
    })
    setTokenToLS(this.accessToken)
  }

  clearToken = () => {
    this.accessToken = null
    this.authHeaders = null
    this.kyAuthInstance = null
    setTokenToLS('')
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

  refreshTokens = async () => this.kyInstance.get(`${this.baseUrl}/api/v1/auth/refresh`, { credentials: 'include' })

  getUserInfo = async () => this.kyAuthInstance.get(`${this.baseUrl}/api/v1/user`)

  changePassword = async (credentials) => this.kyAuthInstance.put(`${this.baseUrl}/api/v1/user/password`, { json: credentials })

  getGameTypes = async () => this.kyAuthInstance.get(`${this.baseUrl}/api/v1/game/types`)

  getGameId = (level, types) => this.kyAuthInstance.post(`${this.baseUrl}/api/v1/game/start`, { json: { level: `${level}`, gameType: `${types}` } })

  getCards = (gameId) => this.kyAuthInstance.get(`${this.baseUrl}/api/v1/game/${gameId}/cards`)

  openCard = (gameId, cardId) => this.kyAuthInstance.post(`${this.baseUrl}/api/v1/game/${gameId}/open/${cardId}`)

  closeCards = (gameId, cardIds) => this.kyAuthInstance.post(`${this.baseUrl}/api/v1/game/${gameId}/close`, { json: { cardIds } })

  getImage = (imgName, gameType) => this.kyAuthInstance.get(`${this.baseUrl}/resources/cards/images/${gameType}/${imgName}`, {
    responseType: 'arraybuffer',
  })

  resetGame = (gameId) => this.kyAuthInstance.post(`${this.baseUrl}/api/v1/game/${gameId}/reset`)

  matchCards = (gameId, isMatchedCards) => this.kyAuthInstance.post(`${this.baseUrl}/api/v1/game/${gameId}/match`, { json: { cardIds: `${isMatchedCards}` } })
}

const api = new Api('http://localhost:5050')

export default api
