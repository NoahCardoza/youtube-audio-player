const config = require('./config');
const app = require('express')();
const GraphQL = require('express-graphql');

app.use('/graphql', GraphQL(req => ({
  graphiql: config.dev,
  schema: require('./schema'),
  formatError: (error) => {
    console.error(error.stack)
    return {
      message: error.message,
      // details: config.dev ? error.stack: null
    }
  }
})))


app.listen(config.graphql.port)
