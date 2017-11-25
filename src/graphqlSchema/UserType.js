const makeUserType = (
  {
    GraphQLObjectType,
    GraphQLInt, GraphQLNonNull, GraphQLString,
  }
) => {
  const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
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
      point: {
        type: new GraphQLNonNull(GraphQLInt),
        resolve(src) {
          return src.point
        }
      },
    },
  })

  return UserType
}

module.exports = makeUserType
