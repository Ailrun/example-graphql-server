const makeGraphqlMiddleware = (graphqlHTTP, schema, database) => {
  return graphqlHTTP({
    schema,
    context: database,
  })
}

module.exports = makeGraphqlMiddleware
