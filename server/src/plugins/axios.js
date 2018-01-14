const axios = require('axios');
const { youtube } = require('../config');

exports.YouTube = axios.create({
  baseURL: 'https://content.googleapis.com/youtube/v3/',
  params: {
    key: youtube.key
  }
})
