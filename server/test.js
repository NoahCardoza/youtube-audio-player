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

const flow = R.pipe(
  R.props(['videoId', 'channelId', 'playlistId']),
  R.reject(R.isNil),
  R.prop(0)
)
// videoId, channelId, playlistId
const data = {
  channelId: 125325
}

console.log(flow(data))
