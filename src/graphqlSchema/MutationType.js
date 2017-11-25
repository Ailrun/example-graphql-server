const makeMutationType = (
  {
    GraphQLObjectType,
    GraphQLInt, GraphQLNonNull, GraphQLString,
  },
  pubsub,
  UserType
) => {
  const createUserArgs = {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    point: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }
  const updateUserArgs = {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLString,
    },
    point: {
      type: GraphQLInt,
    },
  }

  const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: {
        type: UserType,
        args: createUserArgs,
        resolve(_src, args, ctx) {
          return ctx.insert({
            type: 'USER',
            ...args,
          })
            .then((v) => {
              pubsub.publish('user/created', v)
              return v
            })
        },
      },
      updateUser: {
        type: UserType,
        args: updateUserArgs,
        resolve(_src, args, ctx) {
          return ctx.update({
            type: 'USER',
            email: args.email,
          }, {
            '$set': {
              ...args,
            },
          })
        },
      },
    },
  })

  return MutationType
}

module.exports = makeMutationType
