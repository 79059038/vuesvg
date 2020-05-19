const CopyWebpackPlugin = require('copy-webpack-plugin') 
const path = require('path')
module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
            animejs: 'animejs/lib/anime.es.js',
        },
      },
      plugins: [
        new CopyWebpackPlugin({
          patterns: [
            {from: path.join(__dirname, './src/data/data.json'), to: path.join(__dirname, 'dist/data/')}
          ]
        })
      ]
    }
  }