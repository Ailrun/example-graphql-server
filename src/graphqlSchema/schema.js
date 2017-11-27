const makeSchema = (
  { GraphQLSchema },
  Types
) => {
  const schema = new GraphQLSchema({
    query: Types.QueryType,
    mutation: Types.MutationType,
    subscription: Types.SubscriptionType,
  })

  return schema
}

module.exports = makeSchema
