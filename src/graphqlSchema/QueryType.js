const makeQueryType = (
  {
    GraphQLObjectType,
    GraphQLList, GraphQLNonNull, GraphQLString,
  },
  Types
) => {
  const userArgs = {
    uuid: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }
  const postArgs = {
    uuid: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }
  const postsArgs = {
    author: {
      type: GraphQLString,
      description: "The uuid of author"
    },
  }
  
  const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      user: {
        type: Types.UserType,
        args: userArgs,
        resolve(_src, args, ctx) {
          return ctx.findOne({ type: 'USER', _id: args.uuid })
        },
      },
      users: {
        type: new GraphQLList(Types.UserType),
        resolve(_src, _args, ctx) {
          return ctx.find({ type: 'USER' })
        },
      },
      post: {
        type: Types.PostType,
        args: postArgs,
        resolve(_src, args, ctx) {
          return ctx.findOne({ type: 'POST', _id: args.uuid })
        },
      },
      posts: {
        type: new GraphQLList(Types.PostType),
        args: postsArgs,
        resolve(_src, args, ctx) {
          if (args.author) {
            return ctx.find({ type: 'POST', authorId: args.author })
          } else {
            return ctx.find({ type: 'POST' })
          }
        },
      },
    }),
  })

  return QueryType
}

module.exports = makeQueryType
