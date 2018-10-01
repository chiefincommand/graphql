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


export {getAuthorsQuery};