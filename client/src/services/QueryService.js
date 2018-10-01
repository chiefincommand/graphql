import AppApolloClient from './ApolloClient';
import gql from 'graphql-tag';

const getBookList = () => {
    return AppApolloClient.query({
        query : gql`{
            books {
                name
                genre
            }          
    }`
    });
};

export {getBookList};