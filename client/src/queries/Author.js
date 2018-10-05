import gql from 'graphql-tag';

const getAuthorsQuery = gql`
    {
        authors {
            name
            age
            id
        }
    }
`;

const addAuthorMutation = gql`
    mutation AddAuthorMutation($name: String!, $age: Int!){
        addAuthor (name:$name, age : $age) {
            name
            age
            id
          }
      }
`;


export {getAuthorsQuery, addAuthorMutation};