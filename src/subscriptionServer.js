const makeSubscriptionServer = (
  { execute, subscribe },
  database, httpServer, routes, schema, subscriptionLogger,
  SubscriptionServer
) => {
  const subscriptionServer = new SubscriptionServer({
    execute(schema, doc, root, _ctx, variables, operationName) {
      return execute(schema, doc, root, database, variables, operationName)
    },
    schema,
    subscribe(schema, doc, root, _ctx, variables, operationName) {
      return subscribe(schema, doc, root, database, variables, operationName)
    },
    context: database,
    ...subscriptionLogger,
  }, {
    server: httpServer,
    path: routes.subscriptions,
  })

  return subscriptionServer
}

module.exports = makeSubscriptionServer
