import ApolloClient from 'apollo-boost';
// import { defaults, resolvers } from "./resolvers";

const AppApolloClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    // clientState: {
    //     defaults,
    //     resolvers,
    //     typeDefs
    // }
});



export default AppApolloClient;