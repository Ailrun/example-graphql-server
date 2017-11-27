const makeCommentType = (
  {
    GraphQLObjectType,
    GraphQLNonNull, GraphQLString,
  },
  Types
) => {
  const CommentType = new GraphQLObjectType({
    name: 'Comment',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLString),
        resolve(src) {
          return src._id
        },
      },
      author: {
        type: Types.UserType,
        resolve(src, _args, ctx) {
          return ctx.findOne({ type: 'USER', _id: src.authorId })
        },
      },
      post: {
        type: Types.PostType,
        resolve(src, _args, ctx) {
          return ctx.findOne({ type: 'POST', _id: src.postId })
        }
      },
      contents: {
        type: new GraphQLNonNull(GraphQLString),
        resolve(src) {
          return src.contents
        },
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
        resolve(src) {
          return src.createdAt
        },
      },
    }),
  })

  return CommentType
}

module.exports = makeCommentType
