const makeSubscriptionServer = (
  { execute, subscribe },
  httpServer, routes, schema,
  SubscriptionServer
) => {
  const subscriptionServer = new SubscriptionServer({
    execute,
    schema,
    subscribe,
  }, {
    server: httpServer,
    path: routes.subscriptions,
  })

  return subscriptionServer
}

module.exports = makeSubscriptionServer
