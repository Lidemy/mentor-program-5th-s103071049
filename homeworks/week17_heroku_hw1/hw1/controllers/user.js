const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')
const saltRounds = 10
const userController = {
  login: (req, res) => {
    res.render('login')
  },
  handleLogin: (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) {
      req.flash('errorMessage', '資料輸入不齊全')
      return next()
    }
    User.findOne({
      where: {
        username
      }
    }).then(user => {
      if (!user) {
        req.flash('errorMessage', '未存在該用戶')
        return next()
      }
      bcrypt.compare(password, user.password, (err, results) => {
        if (err || !results) {
          req.flash('errorMessage', '資料處理異常')
          return next()
        }
        req.session.username = username
        req.session.userId = user.id
        res.redirect('/')
      })
    }).catch(err => {
      req.flash('errorMessage', '資料處理異常')
      return next()
    })
  },
  logout: (req, res) => {
    req.session.username = null
    res.redirect('/')
  }
}
module.exports = userController
