import gql from 'graphql-tag';

const getBooksQuery = gql`
    {
        books {
            name
            genre
            id
        }
    }
`;

const getBookByIdQuery = gql`
        query getBook($id: ID!) {
            book (id:$id) {
                id
                name
                genre
                author {
                    id
                    name
                    age
                    books {
                        id
                        name
                    }
                }
            }
        }
`;

const addBookMutation = gql`
    mutation AddBookMutation($name: String!, $genre: String!, $authorId: ID!){
        addBook (name:$name, genre : $genre, authorId: $authorId) {
            name
            genre
            id
          }
      }
`;

export {getBooksQuery, addBookMutation, getBookByIdQuery};