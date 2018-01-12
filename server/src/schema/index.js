const fs = require('fs');
const R = require('ramda')
const path = require('path')
const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const loadFile = file => require(path.join(__dirname, file))

const fields = R.reject(R.equals('index.js'))(fs.readdirSync(__dirname))
.reduce(
  (fields, file) =>
    Object.assign(
      fields,
      loadFile(file).root
    ), {}
)

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields
  })
})
