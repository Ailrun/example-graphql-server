const makeHttpServer = (expressApp, http) => {
  return http.createServer(expressApp)
}

module.exports = makeHttpServer
