import { join } from 'path'

export const mode = process.env.NODE_ENV ?? 'release'
export const isDevServer = process.env.WEBPACK_IS_DEV_SERVER === 'true'
export const isRelease = mode === 'release'
export const isDev = !isRelease // staging 포함
export const isDevNotTest = isDev && mode !== 'test' // for jest
export const rootDir = join(__dirname, '../../')
export const defaultPort = 3000
