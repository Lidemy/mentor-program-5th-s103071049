// eslint-disable-next-line
const request = require('request')

request(
  'https://lidemy-book-store.herokuapp.com/books',
  (error, response, body) => {
    // console.log(typeof(body)) 是一個 str
    const json = JSON.parse(body)
    // console.log(json[0].name)
    for (let i = 0; i < 10; i++) {
      console.log(`${json[i].id} ${json[i].name}`)
    }
  })
