const R = require('ramda')
const { GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql');
const axios = require('axios');
const { youtube } = require('../config');


const getOneProp = props => R.pipe(
  R.props(props),
  R.reject(R.isNil),
  R.prop(0)
)

const Field = (resolve, type = GraphQLString) => ({
  type,
  resolve
})

const fetchResults = (q, type) =>
  axios.get('https://content.googleapis.com/youtube/v3/search', {
    params: {
        q,
        type,
        maxResults: 25,
        part: 'snippet',
        key: youtube.key
      }
  }).then(R.prop('data'))

const SearchItemType = new GraphQLObjectType({
  name: 'SearchItem',
  description: '...',
  fields: () => ({
    id: Field(getOneProp(['videoId', 'channelId', 'playlistId'])),
    type: Field(
      R.pipe(
        R.prop('kind'),
        R.split('#'),
        R.prop(1)
      )
    ),
    title: Field(R.prop('title')),
    channel: Field(getOneProp(['channel', 'channelTitle'])),
    thumbnail: Field(R.path(['thumbnails', 'medium', 'url']))
  })
})

const SearchType = new GraphQLObjectType({
  name: 'Search',
  description: 'Uses the YouTube API to search for songs.',
  fields: () => ({
    nextPageToken: {
      type: GraphQLString,
      resolve: R.prop('nextPageToken')
    },
    items:{
      type: GraphQLList(SearchItemType),
      resolve: R.pipe(
        R.prop('items'),
        R.map(
          R.pipe(
            R.props(['id', 'snippet']),
            R.apply(R.merge)
          )
        )
      )
    }
  })
})

const root = ({
  search: {
    type: SearchType,
    args: {
      query: {
        type: GraphQLString
      },
      kind: { // video, channel, playlist
        type: GraphQLString
      }
    },
    resolve: (root, { query, kind }) =>
      fetchResults(query, kind)
  }
})

module.exports = {
  SearchType,
  root
}
