// eslint-disable-next-line
const request = require('request')

request(
  // eslint-disable-next-line
  options = {
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
      'Client-ID': 'ka1mgyrfu09rtyw1znuocyf6x0xciq',
      // eslint-disable-next-line
      'Accept': 'application/vnd.twitchtv.v5+json'
    }
  },

  (error, response, body) => {
    if (error) {
      return console.log(error)
    }
    try {
      const json = JSON.parse(body)
      // eslint-disable-next-line
      const length = json.top.length
      for (let i = 0; i < length; i++) {
        console.log(`${json.top[i].game.name} ${json.top[i].viewers}`)
      }
    } catch (error) {
      console.log('error')
    }
  }
)
