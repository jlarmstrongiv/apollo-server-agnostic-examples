'use strict';
// apollo dependencies
const {
  ApolloServer,
} = require('apollo-server-agnostic');
const { formatClaudia, } = require('./format');
const {
  typeDefs,
  resolvers,
} = require('./graphql');

// Claudia API Builder dependencies
const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();

api.corsMaxAge(60);
// cors headers are automatic, '*'

// create ApolloServer and graphqlHandler
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const graphqlHandler = server.createHandler();

// define routes
api.get('/graphql', async request => {
  request.lambdaContext.callbackWaitsForEmptyEventLoop = false;

  const response = await graphqlHandler(formatClaudia(request));

  const body = response.headers['Content-Type'] === 'text/html' ?
    response.body :
    JSON.parse(response.body);

  // You must parse the body so ApiResponse does not JSON.stringify() twice
  return new api.ApiResponse(body, response.headers, response.statusCode);
});

api.post('/graphql', async request => {
  request.lambdaContext.callbackWaitsForEmptyEventLoop = false;

  const response = await graphqlHandler(formatClaudia(request));

  // You must parse the body so ApiResponse does not JSON.stringify() twice
  return new api.ApiResponse(JSON.parse(response.body), response.headers, response.statusCode);
});

module.exports = api;
