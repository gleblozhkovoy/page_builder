// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)
const withLess = require('@zeit/next-less')
const webpack = require('webpack')

const prod = process.env.NODE_ENV === 'production'

module.exports = withLess({
  assetPrefix: prod ? '/paperless/' : '',
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  }
})
