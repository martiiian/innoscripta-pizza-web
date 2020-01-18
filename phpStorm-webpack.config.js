// This is hinter for jetBrains IDE. Helps to understand nuxt aliases: @/~
// To use this in jetBrains IDE go to: settings -> languages & framework -> javascript -> webpack and add this file
const path = require('path')
module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue', '.ts'],
    root: path.resolve(__dirname),
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname)
    }
  }
}
