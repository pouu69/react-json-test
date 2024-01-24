import { defaultPort } from '../utils/env'

export const devServer = {
  client: {
    overlay: false
  },
  headers: { 'Access-Control-Allow-Origin': '*' },
  historyApiFallback: true,
  hot: true,
  port: defaultPort
}
