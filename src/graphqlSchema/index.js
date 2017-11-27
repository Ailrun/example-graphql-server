const makeModule = (_, graphql, EventEmitter, PubSub) => {
  const makeCommentType = require('./CommentType')
  const makeMutationType = require('./MutationType')
  const makePostType = require('./PostType')
  const makeQueryType = require('./QueryType')
  const makeUserType = require('./UserType')
  const makeSubscriptionType = require('./SubscriptionType')
  const makeSchema = require('./schema')

  const pubsub = new PubSub()

  const Types = {}
  Types.CommentType = makeCommentType(graphql, Types)
  Types.UserType = makeUserType(graphql, Types)
  Types.PostType = makePostType(graphql, Types)

  Types.QueryType = makeQueryType(graphql, Types)
  Types.MutationType =
    makeMutationType(_, graphql, pubsub, Types)
  Types.SubscriptionType =
    makeSubscriptionType(graphql, pubsub, Types)

  const schema =
    makeSchema(graphql, Types)

  return schema
}

module.exports = makeModule
