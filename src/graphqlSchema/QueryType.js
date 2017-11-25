const makeQueryType = (
  {
    GraphQLObjectType,
    GraphQLList, GraphQLNonNull, GraphQLString,
  },
  UserType
) => {
  const UserArgs = {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    }
  }

  const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: UserType,
        args: UserArgs,
        resolve(_src, args, ctx) {
          return ctx.findOne({ type: 'USER', email: args.email })
        }
      },
      users: {
        type: new GraphQLList(UserType),
        resolve(_src, _args, ctx) {
          return ctx.find({ type: 'USER' })
        },
      },
    },
  })

  return QueryType
}

module.exports = makeQueryType
