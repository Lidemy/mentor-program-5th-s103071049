const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const port = process.env.PORT || 5001
const app = express()
const userController = require('./controllers/user')
const prizeController = require('./controllers/prize')

app.set('view engine', 'ejs')
app.use(flash())
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: process.env.secret ,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage')
  res.locals.username = req.session.username
  next()
})

function redirectBack(req, res, next) {
  res.redirect('back')
  return next()
} 

function checkPermission(req, res, next) {
  if (!res.locals.username) {
    return res.redirect('/login')
  }
  return next()
}
// user
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)
// 後台
app.get('/dashboard', checkPermission, prizeController.getAll)
app.get('/addPrize', checkPermission, prizeController.add)
app.post('/addPrize', checkPermission, prizeController.handleAdd, redirectBack)
app.get('/updatePrize/:id', checkPermission, prizeController.update, redirectBack)
app.post('/updatePrize/:id', checkPermission, prizeController.handleUpdate, redirectBack)
app.get('/deletePrize/:id', checkPermission, prizeController.delete, redirectBack)
app.get('/api', prizeController.api)
// 前台
app.get('/', prizeController.index)
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

