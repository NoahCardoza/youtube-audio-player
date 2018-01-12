module.exports = {
  dev: process.env.DEV,
  graphql: {
    port: 1337 || process.env.QL_PORT
  },
  youtube: {
    key: process.env.YT_KEY || console.log('There was no YouTube API Key found...')
  }
}
