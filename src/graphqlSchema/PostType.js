const makePostType = (
  {
    GraphQLObjectType,
    GraphQLList, GraphQLNonNull, GraphQLString,
  },
  Types
) => {
  const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLString),
        resolve(src) {
          return src._id
        },
      },
      title: {
        type: new GraphQLNonNull(GraphQLString),
        resolve(src) {
          return src.title
        },
      },
      author: {
        type: Types.UserType,
        resolve(src, _args, ctx) {
          return ctx.findOne({ type: 'USER', _id: src.authorId })
        },
      },
      contents: {
        type: new GraphQLNonNull(GraphQLString),
        resolve(src) {
          return src.contents
        }
      },
      comments: {
        type: new GraphQLList(Types.CommentType),
        resolve(src, _args, ctx) {
          return ctx.find({ type: 'COMMENT', postId: src._id })
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

  return PostType
}

module.exports = makePostType
