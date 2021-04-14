module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: 'https://rest-api-pwa.herokuapp.com'
}
}
