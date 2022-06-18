const graphql = require("graphql");
const Article = require("../model/article");
const Comment = require("../model/comment");

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const ArticleType = new GraphQLObjectType({
    name: "Article",
    fields: () => ({
        id: { type: GraphQLString },
        title: { type: GraphQLString },
        tag: { type: GraphQLString },
        comments: {
            type: new GraphQLList(CommentType),
            resolve(parent, args) {
                return Comment.find({ articleId: parent.id });
            },
        },
    }),
});

const CommentType = new GraphQLObjectType({
    name: "Comment",
    fields: () => ({
        id: { type: GraphQLString },
        content: { type: GraphQLString },
        articleId: { type: GraphQLString },
        article: {
            type: ArticleType,
            resolve(parent, args) {
                return Article.findById(parent.articleId);
            },
        },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        article: {
            type: ArticleType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                Article.findById(args.id);
            },
        },

        articles: {
            type: new GraphQLList(ArticleType),
            args: { tag: { type: GraphQLString }, page: { type: GraphQLInt }, perPage: { type: GraphQLInt } },
            resolve(parent, args) {
                let page = args.page ? args.page : 1
                let perPage = args.perPage ? args.perPage : 10
                const options = {
                    page: page,
                    limit: perPage,
                    sort: { title: 1 }
                };

                let query = {};
                if (args.tag) query = { tag: args.tag };
                return Article.paginate(query, options, function (e, res) {
                    return res.docs
                });
            },
        },
        comment: {
            type: CommentType,
            args: { id: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args) {
                Comment.findById(args.id);
            },
        },
        comments: {
            type: new GraphQLList(CommentType),
            resolve() {
                return Comment.find();
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addArticle: {
            type: ArticleType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                tag: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let article = new Article({
                    title: args.title,
                    tag: args.tag,
                });

                return article.save();
            },
        },
        updateArticle: {
            type: ArticleType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                title: { type: GraphQLString },
                tag: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Article.findByIdAndUpdate(
                    args.id,
                    { title: args.title, tag: args.tag },
                    {
                        returnOriginal: false,
                    }
                );
            },
        },
        deleteArticle: {
            type: ArticleType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let comments = Comment.find({ articleId: args.id });
                comments.deleteMany();
                return Article.findByIdAndDelete(args.id);
            },
        },
        addComment: {
            type: CommentType,
            args: {
                content: { type: new GraphQLNonNull(GraphQLString) },
                articleId: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let comment = new Comment({
                    content: args.content,
                    articleId: args.articleId,
                });

                return comment.save();
            },
        },
        updateComment: {
            type: CommentType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                content: { type: GraphQLString },
            },
            resolve(parent, args) {
                return Comment.findByIdAndUpdate(
                    args.id,
                    { content: args.content },
                    {
                        returnOriginal: false,
                    }
                );
            },
        },
        deleteComment: {
            type: CommentType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                return Comment.findByIdAndDelete(args.id);
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
