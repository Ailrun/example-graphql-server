const makeUserType = (
  {
    GraphQLObjectType,
    GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString,
  },
  Types
) => {
  const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLString),
        resolve(src) {
          return src._id
        },
      },
      name: {
        type: new GraphQLNonNull(GraphQLString),
        resolve(src) {
          return src.name
        },
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
        resolve(src) {
          return src.email
        },
      },
      posts: {
        type: new GraphQLList(Types.PostType),
        resolve(src, _args, ctx) {
          return ctx.find({ type: 'POST', authorId: src._id })
        }
      },
      signUpAt: {
        type: new GraphQLNonNull(GraphQLString),
        resolve(src) {
          return src.createdAt
        },
      },
    }),
  })

  return UserType
}

module.exports = makeUserType
