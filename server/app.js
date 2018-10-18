const express = require('express');
const graphqlExpress = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 4000;
const app = express();

app.use(cors());

const username = 'graphql-user';
const password = '';
const databaseName = 'graphql';
//connect to mlab DB. to setup a db go to: https://mlab.com , sign up for an account and create a sandbox
mongoose.connect(`mongodb://${username}:${password}@ds115931.mlab.com:15931/${databaseName}`);
mongoose.connection.once('open', () => {
   console.log('connected to database')
});

app.use('/graphql', graphqlExpress({
    schema,
    graphiql: true //to launch graphql interactive interface
}));

//allow cross origin requests



app.listen(PORT, () => {
    console.log(`Listening for requests to port ${PORT}`);
});

