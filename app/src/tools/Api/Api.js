import ky from 'ky'

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.headers = {
      'Content-Type': 'application/json',
    }
  }

  signUp = (signUpData) => ky.post(
    `${this.baseUrl}/api/v1/auth/signup`,
    { headers: this.headers, body: JSON.stringify(signUpData) },
  )
}

const api = new Api('http://localhost:5050')

export default api
