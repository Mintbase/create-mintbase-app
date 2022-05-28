const path = require('path')

module.exports = {
  images: {
    domains: [
      'arweave.net',
      'coldcdn.com',
      'firebasestorage.googleapis.com',
      'pbs.twimg.com',
      'lh3.googleusercontent.com',
      'twitter.com',
      'source.unsplash.com',
      'abs.twimg.com',
      'www.arweave.net'
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (isServer) {
      config.externals = ['react', ...config.externals]
    }
    config.resolve.alias['react'] = path.resolve(
      __dirname,
      '.',
      'node_modules',
      'react'
    )
    return config
  },
}
