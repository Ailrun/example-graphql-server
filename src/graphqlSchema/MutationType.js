const makeMutationType = (
  _,
  {
    GraphQLObjectType,
    GraphQLInt, GraphQLNonNull, GraphQLString,
  },
  pubsub,
  Types
) => {
  const createUserArgs = {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }
  const updateUserArgs = {
    uuid: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The uuid of user'
    },
    name: {
      type: GraphQLString,
    },
    point: {
      type: GraphQLInt,
    },
  }
  const createPostArgs = {
    author: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The uuid of author'
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    contents: {
      type: GraphQLString,
    },
  }
  const updatePostArgs = {
    uuid: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The uuid of post'
    },
    title: {
      type: GraphQLString,
    },
    contents: {
      type: GraphQLString,
    },
  }
  const createCommentArgs = {
    author: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The uuid of author'
    },
    post: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The uuid of post'
    },
    contents: {
      type: GraphQLString,
    },
  }
  const updateCommentArgs = {
    uuid: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The uuid of comment'
    },
    contents: {
      type: GraphQLString,
    },
  }

  const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      createUser: {
        type: Types.UserType,
        args: createUserArgs,
        async resolve(_src, args, ctx) {
          const user = await ctx.insert({
            type: 'USER', ...args,
          })

          pubsub.publish('USER/created', user)

          return user
        },
      },
      updateUser: {
        type: Types.UserType,
        args: updateUserArgs,
        async resolve(_src, args, ctx) {
          const user = await ctx.update({
            type: 'USER', _id: args.uuid,
          }, {
            $set: _.omit(args, 'uuid'),
          })

          pubsub.publish('USER/updated', user)

          return user
        },
      },
      createPost: {
        type: Types.PostType,
        args: createPostArgs,
        async resolve(_src, args, ctx) {
          const authorCount = await ctx.count({
            type: 'USER', _id: args.author,
          })

          if (authorCount === 0) {
            throw new Error('Author does not exist')
          }

          const post = await ctx.insert({
            type: 'POST',
            authorId: args.author,
            ...(_.omit(args, 'author')),
          })

          pubsub.publish('POST/created', post)

          return post
        },
      },
      updatePost: {
        type: Types.PostType,
        args: updatePostArgs,
        async resolve(_src, args, ctx) {
          const post = await ctx.update({
            type: 'POST', _id: args.uuid,
          }, {
            $set: _.omit(args, 'uuid'),
          })

          pubsub.publish('POST/updated', post)

          return post
        },
      },
      createComment: {
        type: Types.CommentType,
        args: createCommentArgs,
        async resolve(_src, args, ctx) {
          const authorCount = await ctx.count({
            type: 'USER', _id: args.author,
          })
          const postCount = await ctx.count({
            type: 'POST', _id: args.post,
          })

          if (authorCount === 0) {
            throw new Error('Author does not exist')
          }

          if (postCount === 0) {
            throw new Error('Post does not exist')
          }

          const comment = await ctx.insert({
            type: 'COMMENT',
            authorId: args.author,
            postId: args.post,
            ...(_.omit(args, 'author', 'post'))
          })

          pubsub.publish('COMMENT/created', comment)

          return comment
        },
      },
      updateComment: {
        type: Types.CommentType,
        args: updateCommentArgs,
        async resolve(_src, args, ctx) {
          const comment = await ctx.update({
            type: 'COMMENT', _id: args.uuid,
          }, {
            $set: _.omit(args, 'uuid'),
          });

          pubsub.publish('COMMENT/updated', comment)

          return comment
        }
      },
    }),
  })

  return MutationType
}

module.exports = makeMutationType
