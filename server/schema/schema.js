const graphql = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');


const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        genre: {type: GraphQLString},
        name: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent/*, args*/) {
                //return authors.find((author) => author.id === parent.authorId);
                return Author.findById(parent.authorId);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books.filter((book) => book.authorId === parent.id);
                return Book.find({ authorId : parent.id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}}, //required params
            resolve(parent, args /*same as above args*/) {
                //code to get data from db/other sources
                //console.log(typeof args.id);
                //return books.find((value) => value.id === args.id);
                return Book.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            args: {}, //required params
            resolve() {
                //code to get data from db/other sources
                //return books;
                return Book.find({});
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}}, //required params
            resolve(parent, args /*same as above args*/) {
                //code to get data from db/other sources
                return Author.findById(args.id);
                //return authors.find((value) => value.id === args.id);

            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            args: {}, //required params
            resolve() {
                //code to get data from db/other sources
                //return authors;
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)}, //required params
                age: {type: new GraphQLNonNull(GraphQLInt)} //required params
            },
            resolve(parent, args) {
                const author = new Author(args);
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                genre: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                const book = new Book(args);
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});


