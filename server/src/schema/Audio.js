const shelljs = require('shelljs');
const R = require('ramda')
const axios = require('axios');
const { GraphQLList, GraphQLString, GraphQLObjectType } = require('graphql');
const shell = require('shelljs');
const { YouTube } = require('../plugins/axios');



if (!shell.which('youtube-dl')) {
  console.log('youtube-dl needs to be installed first. https://github.com/rg3/youtube-dl');
  process.exit(1)
}

const fetchAudio = (id) =>
  new Promise((resolve, reject) => {
    shell.exec(
      `youtube-dl -g "https://www.youtube.com/watch?v=${id}"`,
      { silent:true },
      R.pipe(
        R.nthArg(1),
        R.split('\n'),
        R.prop(1),
        link => resolve(link)
      )
    )
  })

const fetchAudioInfo = (id) =>
  YouTube.get('videos', {
    prams: {
      id,
      part: "id,snippet"
    }
  })

fetchAudioInfo('G4ljYEVwVYQ').then(console.log)


// const getOneProp = props => R.pipe(
//   R.props(props),
//   R.reject(R.isNil),
//   R.prop(0)
// )

// const Field = (resolve, type = GraphQLString) => ({
//   type,
//   resolve
// })
//
// const AudioType = new GraphQLObjectType({
//   name: 'Audio',
//   description: 'Audio',
//   fields: () => ({
//     url: {
//       type: GraphQLString,
//       resolve: fetchAudio
//     },
//     // items:{
//     //   type: GraphQLList(SearchItemType),
//     //   resolve: R.pipe(
//     //     R.prop('items'),
//     //     R.map(
//     //       R.pipe(
//     //         R.props(['id', 'snippet']),
//     //         R.apply(R.merge)
//     //       )
//     //     )
//     //   )
//     // }
//   })
// })

const root = ({
  audio: {
    type: GraphQLString,
    args: {
      id: {
        type: GraphQLString
      }
    },
    resolve: (root, { id }) =>
      fetchAudio(id)
  }
})

module.exports = {
  root
}
