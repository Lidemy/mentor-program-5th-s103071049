const db = require('../models')
const Prize = db.Prize

function getRandom(x) {
  return Math.floor(Math.random()*x) +1
}

function compare(a, b) {
  if (a.probability < b.probability) {
    return -1
  }
  if (a.probability > b.probability) {
    return 1
  }
  return 0
}

function randomChoice(array) {
  let sum = 0
  for (let i = 0; i < array.length; i++) {
    sum += array[i].probability
  }
  let randomInt = getRandom(sum)
  array.sort(compare)
  for (let i = 0; i < array.length; i++) {
    randomInt -= array[i].probability
    if (randomInt <= 0) {
      return array[i].id
    }
  }
}

const prizeController = {
  getAll: (req, res, next) => {
    Prize.findAll({
    }).then((prizes) => {
      res.render('dashboard', {
        prizes
      })
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    }) 
  },
  add: (req, res, next) => {
    res.render('add_prize')
  },
  handleAdd: (req, res, next) => {
    const {name, description, imgUrl, probability} = req.body
    if (!name || !description || !imgUrl || !probability) {
      req.flash('errorMessage', '資料未輸入齊全無法儲存')
      return next()
    }
    Prize.create({
      name,
      description,
      imgUrl,
      probability
    }).then(() => {
      res.redirect('/dashboard')
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  update: (req, res, next) => {
    const {id} = req.params
    Prize.findOne({
      where: {
        id
      }
    }).then(post => {
      res.render('update_prize', {
        post
      })
    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  handleUpdate: (req, res, next) => {
    const {id} = req.params
    const {name, description, imgUrl, probability} = req.body
    if (!name || !description || !imgUrl || !probability) {
      req.flash('errorMessage', '資料未輸入齊全無法儲存')
      return next()
    }
    Prize.findOne({
      where:{
        id
      }
    }).then(post => {
      return post.update({
        name: req.body.name,
        description: req.body.description,
        imgUrl: req.body.imgUrl,
        probability: req.body.probability
      })
    }).then(() => {
      res.redirect('/dashboard')
    }).catch(() => {
      res.redirect('/dashboard')
    })
  },
  delete: (req, res, next) => {
    const {id} = req.params
    Prize.findOne({
      where: {
        id
      }
    }).then(post => {
      return post.destroy()
    }).then(() => {
      return next()
    }).catch((err) => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  api: (req, res) => {
    Prize.findAll()
    .then(prizes => {
      const arr = []
      for (const prize of prizes) {
        arr.push({'id': prize.id, 'probability': prize.probability, 'name': prize.name})
      }
      const prizeId = randomChoice(arr)
      Prize.findOne({
        where: {
          id : prizeId
        }
      }).then(result => {
        res.json(result)
      })
    })
  },
  index: (req, res) => {
    res.render('index')
  }
}
module.exports = prizeController