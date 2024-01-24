import path from 'path'

import { ProvidePlugin, ProgressPlugin, DefinePlugin } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ReactRefreshTypeScript from 'react-refresh-typescript'
import TerserPlugin from 'terser-webpack-plugin'

import {
  isDev,
  isDevServer,
  mode,
  isRelease,
  rootDir,
  isDevNotTest
} from './utils/env'

export default {
  context: __dirname,
  target: isDevServer ? 'web' : ['web', 'es5'],
  mode: isRelease ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: {
    main: path.join(rootDir, '/src/index.tsx')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: isDevServer
      ? 'static/js/[name].[fullhash].js'
      : 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash:8].[ext]',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [isDevNotTest && ReactRefreshTypeScript()].filter(
                  Boolean
                )
              }),
              transpileOnly: isDev
            }
          }
        ],
        exclude: [/node_modules/]
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.join(rootDir, '/babel.config.js')
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isRelease
            ? {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  esModule: false
                }
              }
            : {
                loader: 'style-loader',
                options: {
                  esModule: false
                }
              },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]?[hash]'
            }
          }
        ]
      },
      { test: /\.json$/, type: 'json' }
    ]
  },
  plugins: [
    new ProgressPlugin(),
    new ProvidePlugin({}),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(mode)
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(rootDir, './public/index.html')
    })
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    alias: {
      '@': path.join(rootDir, '/src')
    },
    extensions: ['.js', '.jsx', '.json', '.css', '.ts', '.tsx', '.mjs']
  },
  optimization: {
    ...(isRelease
      ? {
          minimize: true,
          minimizer: [
            new TerserPlugin({
              parallel: true,
              terserOptions: {
                compress: {
                  drop_console: isRelease
                }
              }
            })
          ]
        }
      : {}),
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-redux|core-js)[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        },
        default: {
          reuseExistingChunk: true
        }
      }
    }
  }
}
