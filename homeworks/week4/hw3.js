// eslint-disable-next-line
const request = require('request')

const process = require('process')

const name = process.argv[2]

function main() {
  if (!name) {
    return console.log('請輸入國家名稱')
  }
  request(
  `https://restcountries.eu/rest/v2/name/${name}`,

  (error, response, body) => {
    if (response.statusCode === 404) {
      return console.log('找不到國家資訊')
    }
    let json
    try {
      json = JSON.parse(body)
    } catch (error) {
      console.log('找不到國家資訊')
    }
    // eslint-disable-next-line
    const length = Object.keys(json).length
    for (let i = 0; i < length; i++) {
      console.log('============')
      console.log(`國家 : ${json[i].name}`)
      console.log(`首都 : ${json[i].capital}`)
      console.log(`貨幣 : ${json[i].currencies[0].code}`)
      console.log(`國碼 : ${json[i].callingCodes}`)
    }
  }
  )
}

main()
