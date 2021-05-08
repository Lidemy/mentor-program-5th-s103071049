// eslint-disable-next-line
const request = require('request')

const clientID = 'ka1mgyrfu09rtyw1znuocyf6x0xciq'
const baseUrl = 'https://api.twitch.tv/helix'
const name = process.argv[2]

request.get(
  // eslint-disable-next-line
  options = {
    url: `${baseUrl}/games?name=${name}`,
    headers: {
      'Client-ID': clientID,
      // eslint-disable-next-line
      'Authorization':'Bearer 18xc757nh6jpvceaykdww5giadsfy4'
    }
  },
  (error, response, body) => {
    const gameInfor = JSON.parse(body)
    const gameID = gameInfor.data[0].id
    console.log(`search game ${gameInfor.data[0].name} now, and the gameID is ${gameID}`)
    console.log('==========')
    request.get(
      // eslint-disable-next-line
      options = {
        url: `${baseUrl}/streams?game_id=${gameID}&first=100`,
        headers: {
          'Client-ID': clientID,
          // eslint-disable-next-line
          'Authorization':'Bearer 18xc757nh6jpvceaykdww5giadsfy4'
        }
      },
      (error, response, body) => {
        const inforOne = JSON.parse(body)
        const after = inforOne.pagination.cursor
        for (let i = 0; i < inforOne.data.length; i++) {
          console.log(`(${i + 1}) name: ${inforOne.data[i].user_name} id: ${inforOne.data[i].id}`)
        }
        request.get(
          // eslint-disable-next-line
          options = {
            url: `${baseUrl}/streams?game_id=${gameID}&first=100&after=${after}`,
            headers: {
              'Client-ID': clientID,
              // eslint-disable-next-line
              'Authorization':'Bearer 18xc757nh6jpvceaykdww5giadsfy4'
            }
          },
          (error, response, body) => {
            const inforTwo = JSON.parse(body)
            for (let i = 0; i < inforTwo.data.length; i++) {
              console.log(`(${i + 1 + inforOne.data.length}) name: ${inforTwo.data[i].user_name} id: ${inforTwo.data[i].id}`)
            }
          }
        )
      }
    )
  }
)
