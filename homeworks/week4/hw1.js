// eslint-disable-next-line
const request = require('request')

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    // console.log(typeof(body)) 是一個 str
    if (error) {
      return console.log('error', error)
    }

    // console.log(json[0].name)
    let books
    try {
      books = JSON.parse(body)
    } catch (error) {
      return console.log('error', error)
    }
    for (let i = 0; i < books.length; i++) {
      console.log(`${books[i].id} ${books[i].name}`)
    }
  })
