const makeSubscriptionServer = (
  { execute, subscribe },
  httpServer, routes, schema, subscriptionLogger,
  SubscriptionServer
) => {
  const subscriptionServer = new SubscriptionServer({
    execute,
    schema,
    subscribe,
    ...subscriptionLogger,
  }, {
    server: httpServer,
    path: routes.subscriptions,
  })

  return subscriptionServer
}

module.exports = makeSubscriptionServer
