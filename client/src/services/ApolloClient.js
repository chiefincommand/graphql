import ApolloClient from 'apollo-boost';

const AppApolloClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});



export default AppApolloClient;