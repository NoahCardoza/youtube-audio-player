const R = require('ramda');

// const flow = R.pipe(
//   R.prop('items'),
//   R.props(['id', 'snippet']),
//   R.apply(Object.assign),
// )
//
// const data = {
//   items: {
//     id: {
//       question: "What is the answer to the Ultimate Question of Life, the Universe, and Everything?"
//     },
//     snippet: {
//       answer: "42"
//     }
//   }
// }
//
// const ret = flow(data)
//
// console.log(ret)

// const flow = R.pipe(
//   R.props(['videoId', 'channelId', 'playlistId']),
//   R.reject(R.isNil),
//   R.prop(0)
// )
// // videoId, channelId, playlistId
// const data = {
//   channelId: 125325
// }
//
// console.log(flow(data))


// const shell = require('shelljs');
//
// if (!shell.which('youtube-dl')) {
//   shell.echo('youtube-dl needs to be installed first. https://github.com/rg3/youtube-dl');
//   shell.exit(1);
// }
//
// id = 'G4ljYEVwVYQ'
//
// shell.exec(
//   `youtube-dl -g "https://www.youtube.com/watch?v=${id}"`,
//   { silent:true },
//   R.pipe(
//     R.nthArg(1),
//     R.split('\n'),
//     R.prop(1),
//     link => resolve(link)
//   )
// )

const { YouTube } = require('./src/plugins/axios');
const prettify = obj => console.log(JSON.stringify(obj, null, 2)) // Pretty Print

const fetchAudioInfo = (id) =>
  YouTube.get('videos', {
    params: {
      id,
      part: 'snippet,contentDetails,statistics'
    }
  })

fetchAudioInfo('G4ljYEVwVYQ')
.then(
  R.pipe(
    R.prop('data'),
    R.prop('items'),
    R.prop(0),
    prettify
  )
)
.catch(
  R.pipe(
    R.prop('response'),
    R.prop('data'),
    R.prop('error'),
    prettify
  )
)
