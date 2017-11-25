const makeSchema = (
  { GraphQLSchema },
  QueryType, MutationType, SubscriptionType
) => {
  const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType,
    subscription: SubscriptionType,
  })

  return schema
}

module.exports = makeSchema
