const makeSubscriptionType = (
  {
    GraphQLObjectType,
    GraphQLList, GraphQLNonNull, GraphQLString,
  },
  pubsub,
  UserType
) => {
  let subed = false;

  const SubscriptionType = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
      creationOfUser: {
        type: UserType,
        resolve(src) {
          return src
        },
        subscribe() {
          return pubsub.asyncIterator('user/created')
        }
      },
    },
  })

  return SubscriptionType
}

module.exports = makeSubscriptionType
