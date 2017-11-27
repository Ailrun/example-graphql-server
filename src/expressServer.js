const makeExpressApp = (
  express, cors,
  graphqlMiddleware, playgroundMiddleware,
  routes
) => {
  const app = express()

  return app
    .use(routes.graphql, cors(), graphqlMiddleware)
    .use(routes.playground, playgroundMiddleware)
}

module.exports = makeExpressApp
