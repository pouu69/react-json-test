import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import { devServer } from './config/devServer'
import { isDevNotTest } from './utils/env'

export default {
  devtool: 'cheap-module-source-map',
  plugins: [isDevNotTest && new ReactRefreshWebpackPlugin()].filter(Boolean),
  devServer
}
