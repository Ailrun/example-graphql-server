const makeSubscriptionType = (
  {
    GraphQLObjectType,
    GraphQLList, GraphQLNonNull, GraphQLString,
  },
  pubsub,
  Types
) => {
  let subed = false;

  const SubscriptionType = new GraphQLObjectType({
    name: 'Subscription',
    fields: () => ({
      creationOfUser: {
        type: Types.UserType,
        resolve(src) {
          return src
        },
        subscribe() {
          return pubsub.asyncIterator('USER/created')
        },
      },
      creationOfPost: {
        type: Types.PostType,
        resolve(src) {
          return src
        },
        subscribe() {
          return pubsub.asyncIterator('POST/created')
        },
      },
      creationOfComment: {
        type: Types.CommentType,
        resolve(src) {
          return src
        },
        subscribe() {
          return pubsub.asyncIterator('COMMENT/created')
        },
      },
    }),
  })

  return SubscriptionType
}

module.exports = makeSubscriptionType
