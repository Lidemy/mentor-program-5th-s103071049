const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const userController = require('./controllers/user')
const postController = require('./controllers/post')
const app = express()
const port = process.env.PORT || 5001
const flash = require('connect-flash')
app.set('view engine', 'ejs')
app.use(flash())
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: process.env.secret,
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

app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/logout', userController.logout)
app.get('/', postController.index)
app.get('/addPost', postController.addPost)
app.post('/addPost', postController.handleAddPost, redirectBack)
app.get('/delete/:id', postController.delete, redirectBack)
app.get('/update/:id', postController.update)
app.post('/update/:id', postController.handleUpdate, redirectBack)
app.get('/readMore/:id', postController.readMore)
app.get('/backend', postController.backend)
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
