module.exports = (api) => {
  const mode = process.env.NODE_ENV || 'release'

  // This caches the Babel config by environment.
  api.cache.using(() => mode)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3,
          targets: {
            browsers: ['last 2 version', 'not dead']
          }
        }
      ],
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
    plugins: [
      ...[
        // Applies the react-refresh Babel plugin on non-production modes only
        mode === 'development' && 'react-refresh/babel'
      ].filter(Boolean)
    ]
  }
}
