module.exports.resolvers = { Query: { hello: () => 'Hello world!', }, };

module.exports.typeDefs = /* GraphQL */`
  type Query {
    hello: String
  }
`;
