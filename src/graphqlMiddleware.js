const makeGraphqlMiddleware = (graphqlHTTP, gqlLogger, schema, database) => {
  return graphqlHTTP((req, res, gqlParams) => {
    gqlLogger.preLogger(req)

    return {
      schema,
      context: database,
      extensions() {
        gqlLogger.postLogger(gqlParams)
      },
    }
  })
}

module.exports = makeGraphqlMiddleware
