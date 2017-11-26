const makeHttpServer = (expressApp, http) => {
  const httpServer = http.createServer(expressApp)

  return httpServer
}

module.exports = makeHttpServer
