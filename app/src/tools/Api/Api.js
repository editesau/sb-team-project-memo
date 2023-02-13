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

  signIn = (signInData) => ky.post(
    `${this.baseUrl}/api/v1/auth/signin`,
    { headers: this.headers, body: JSON.stringify(signInData), credentials: 'include' },
  )

  signOut = () => ky.post(
    `${this.baseUrl}/api/v1/auth/signout`,
    { headers: this.headers, credentials: 'include' },
  )
}

const api = new Api('http://localhost:5050')

export default api
