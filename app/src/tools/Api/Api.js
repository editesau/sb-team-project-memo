import ky from 'ky'

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  signUp = (signUpData) => ky.post(`${this.baseUrl}/signup`, signUpData)
}

const api = new Api('localhost:5050')

export default api
