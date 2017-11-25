const makePlaygroundMiddleware = (graphqlPlayground, routes) => {
  return graphqlPlayground({
    endpoint: routes.graphql,
    subscriptionEndpoint: routes.subscriptions,
  })
}

module.exports = makePlaygroundMiddleware
