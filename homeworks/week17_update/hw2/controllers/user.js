const db = require('../models')
const User = db.User
const bcrypt = require('bcrypt')
const saltRounds= process.env.saltRounds
const userController ={
  login: (req, res) => {
    res.render('login')
  },
  handleLogin: (req, res, next) => {
    const {username, password} = req.body
    if (!username || !password) {
      req.flash('errorMessage', '資料未輸入完整')
      return next()
    }
    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '用戶資料不存在')
        return next()
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          req.flash('errorMessage', '資料錯誤!!!')
          return next()
        }
        req.session.username = username
        res.redirect('/dashboard')
      })

    }).catch(err => {
      req.flash('errorMessage', err.toString())
      return next()
    })
  },
  logout: (req, res) => {
    req.session.destroy()
    return res.redirect('/')
  }
}

module.exports = userController


