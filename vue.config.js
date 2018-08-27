const fs = require('fs')

const vueHost = process.env.VUE_HOST ? process.env.VUE_HOST.replace(/\/$/g, '') : null
const vuePort = process.env.VUE_PORT || null
const vueUrl = vueHost && vuePort ? vueHost + ':' + vuePort : null

const env = {
  NODE_ENV: process.env.NODE_ENV,
  API_URL: process.env.API_URL.replace(/\/$/g, ''),
  FRONT_URL: process.env.FRONT_URL.replace(/\/$/g, ''),
  VUE_HOST: vueHost,
  VUE_PORT: vuePort,
  VUE_URL: vueUrl
}

const devServer = {
  https: true
}

if (process.env.PUBLIC) {
  devServer.public = process.env.PUBLIC
}

if (process.env.KEY_PATH && process.env.CERT_PATH) {
  devServer.https = {
    key: fs.readFileSync(process.env.KEY_PATH),
    cert: fs.readFileSync(process.env.CERT_PATH)
  }
}

module.exports = {
  pluginOptions: {
    env
  },
  devServer
}
