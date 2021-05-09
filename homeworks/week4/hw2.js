// eslint-disable-next-line
const request = require('request')

const process = require('process')

const paraOne = process.argv[2] // list, read, delete, create, update
const paraTwo = process.argv[3] // id, bookname
const paraThree = process.argv[4] // bookname

switch (paraOne) {
  case 'list':
    list()
    break

  case 'read':
    read(paraTwo)
    break

  case 'delete':
    del(paraTwo)
    break

  case 'create':
    create(paraTwo)
    break

  case 'update':
    update(paraTwo, paraThree)
    break

  default :
    console.log('unknown action')
}

function list() {
  request(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
      if (error) {
        return console.log('抓取失敗', error)
      }
      const json = JSON.parse(body)
      for (let i = 0; i < json.length; i++) {
        console.log(`${json[i].id} ${json[i].name}`)
      }
    }
  )
}

function read(paraTwo) {
  request(
     `https://lidemy-book-store.herokuapp.com/books/${paraTwo}`,
     (error, response, body) => {
       if (error) {
         return console.log('抓取失敗', error)
       }
       const json = JSON.parse(body)
       console.log(json.name)
     }
  )
}

function del(paraTwo) {
  request.delete(
      `https://lidemy-book-store.herokuapp.com/books/${paraTwo}`,
      (error, response, body) => {
        if (error) {
          return console.log('刪除失敗', error)
        }
        console.log('刪除成功')
      }
  )
}

function create(paraTwo) {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form: {
        name: paraTwo
      }
    }, (error, response, body) => {
      if (error) {
        return console.log('新增失敗', error)
      }
      console.log('新增成功')
    }
  )
}

function update(paraTwo, paraThree) {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${paraTwo}`,
      form: {
        name: paraThree
      }
    }, (error, body, response) => {
      if (error) {
        return console.log('更新失敗', error)
      }
      console.log('更新成功')
    })
}
