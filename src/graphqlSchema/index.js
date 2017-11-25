const makeModule = (graphql, EventEmitter, PubSub) => {
  const makeMutationType = require('./MutationType')
  const makeQueryType = require('./QueryType')
  const makeUserType = require('./UserType')
  const makeSubscriptionType = require('./SubscriptionType')
  const makeSchema = require('./schema')

  const pubsub = new PubSub()
  const UserType = makeUserType(graphql)
  const QueryType = makeQueryType(graphql, UserType)
  const MutationType =
    makeMutationType(
      graphql,
      pubsub,
      UserType
    )
  const SubscriptionType =
    makeSubscriptionType(
      graphql,
      pubsub,
      UserType
    )
  const schema =
    makeSchema(
      graphql,
      QueryType, MutationType, SubscriptionType
    )

  return schema
}

module.exports = makeModule
