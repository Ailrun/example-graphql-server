const makeExpressApp = (
  express,
  graphqlMiddleware, playgroundMiddleware,
  routes
) => {
  const app = express()

  return app
    .use(routes.graphql, graphqlMiddleware)
    .use(routes.playground, playgroundMiddleware)
}

module.exports = makeExpressApp
