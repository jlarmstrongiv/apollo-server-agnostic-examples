const {
  ApolloServer,
} = require('apollo-server-agnostic');
const {
  formatExpress,
} = require('./format');
const {
  typeDefs,
  resolvers,
} = require('./graphql');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: context => context,
});

const graphqlHandler = server.createHandler();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create graphqlHandler here

app.get('/graphql', async (req, res) => {
  const response = await graphqlHandler(formatExpress(req));

  res.status(response.statusCode)
    .set(response.headers)
    .send(response.body);
});

app.post('/graphql', async (req, res) => {
  const response = await graphqlHandler(formatExpress(req), 'boi', { yolo: 'booya', });

  res.status(response.statusCode) // use statusCode
    .set(response.headers) // merge headers
    .send(response.body); // send body string
});

const listener = app.listen({ port: 3001, }, () => {
  console.log(`🚀 Server ready at http://localhost:${listener.address().port}${server.graphqlPath}`);
});
