import * as dotenv from 'dotenv'
import {
  MONGO_CA_PATH, MONGO_CLIENT_CRT_PATH, MONGO_HOST, MONGO_PORT,
} from '../helpers/constants.js'

dotenv.config()

export const genConnectionString = () => {
  if (!MONGO_CA_PATH) throw Error('No mongo CA Path in environment')
  if (!MONGO_CLIENT_CRT_PATH) throw Error('No mongo client crt Path in environment')

  return `mongodb://${MONGO_HOST}:${MONGO_PORT}/`
}

export const genConnectionOptions = () => ({
  tls: true,
  tlsInsecure: true,
  tlsCAFile: MONGO_CA_PATH,
  tlsCertificateKeyFile: MONGO_CLIENT_CRT_PATH,
  authMechanism: 'MONGODB-X509',
})
