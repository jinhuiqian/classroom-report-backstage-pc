module.exports = {
  devServer: {
    host: 'localhost',
    port: 8888,
    https: false,
    open: true,
    hotOnly: true
  },
  lintOnSave: false,
  outputDir: './dist',
  assetsDir: './assets/',
  publicPath: './',
  indexPath: './index.html',
  transpileDependencies: ['vuetify']
}
