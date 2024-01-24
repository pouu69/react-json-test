import merge from 'webpack-merge'

import baseConfig from './webpack/base'
import devConfig from './webpack/dev'
import prodConfig from './webpack/prod'
import { isRelease } from './webpack/utils/env'

export default () =>
  isRelease ? merge(baseConfig, prodConfig) : merge(baseConfig, devConfig)
