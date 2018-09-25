const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLSchema
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLString},
        genre: {type: GraphQLString},
        name: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent/*, args*/) {
                return authors.find((author) => author.id === parent.authorId);
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
            resolve(parent) {
                return books.filter((book) => book.authorId === parent.id);
            }
        }
    })
});

//dummy data
const books = [
    {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1'},
    {name: 'The final empire', genre: 'Sci-Fi', id: '2', authorId: '2'},
    {name: 'The Long Earth', genre: 'Fiction', id: '3', authorId: '3'},
    {name: 'The notebook', genre: 'Sci-Fi', id: '4', authorId: '2'},
    {name: 'The something', genre: 'Fiction', id: '5', authorId: '3'}
];

const authors = [
    {name: 'Patrick', age: 40, id: '1'},
    {name: 'Sohrab', age: 30, id: '2'},
    {name: 'Terry', age: 90, id: '3'}
];

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}}, //required params
            resolve(parent, args /*same as above args*/) {
                //code to get data from db/other sources
                console.log(typeof args.id);
                return books.find((value) => value.id === args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            args: {}, //required params
            resolve() {
                //code to get data from db/other sources
                return books;
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}}, //required params
            resolve(parent, args /*same as above args*/) {
                //code to get data from db/other sources

                return authors.find((value) => value.id === args.id);
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            args: {}, //required params
            resolve() {
                //code to get data from db/other sources
                return authors;
            }
        },
    }
});

module.exports = new GraphQLSchema({query: RootQuery});


