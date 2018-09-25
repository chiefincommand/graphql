const express = require('express');
const graphqlExpress = require('express-graphql');
const schema = require('./schema/schema');
const PORT = 4000;
const app = express();

app.use('/graphql', graphqlExpress({
    schema,
    graphiql: true
}));


app.listen(PORT, () => {
    console.log(`Listening for requests to port ${PORT}`);
});

