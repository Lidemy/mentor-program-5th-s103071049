const db = require('../models')
const User = db.User
const Post = db.Post

const postController = {
  index: (req, res) => {
    Post.findAll({
      include: User
    }).then(posts => {
      res.render('index', {
        posts
      })
    })
  },
  addPost: (req, res) => {
    res.render('addPost')
  },
  handleAddPost: (req, res, next) => {
    const {title, content} = req.body
    const {username} = req.session
    if (!title || !content) {
      req.flash('errorMessage', '尚未輸入內容')
      return next()
    }
    if (!username) {
      return res.redirect('login')
    }
    Post.create({
      content,
      title,
      UserId: req.session.userId
    }).then(() => {
      res.redirect('/')
    })
  },
  delete: (req, res, next) => {
    Post.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(post => {
      return post.destroy()
    }).then(() => {
      return next()
    }).catch(() => {
      return next()
    })
  },
  update: (req, res) => {
    const {username} = req.session
    if (!username) {
      return res.redirect('/')
    }
    Post.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(post => {
      res.render('update', {
        post,
        id: req.params.id,
      })
    })
  },
  handleUpdate: (req, res, next) => {
    const {title, content} = req.body
    if (!title) {
      req.flash('errorMessage', '尚未輸入標題')
      return next()
    }
    if (!title || !content) {
      req.flash('errorMessage', '尚未更新內容')
      return next()
    }
    Post.findOne({
      where: {
        id: req.params.id,
        userId: req.session.userId
      }
    }).then(post => {
      return post.update({
        title: req.body.title,
        content: req.body.content
      })
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      res.redirect('/')
    })
  },
  readMore: (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(post => {
      res.render('readMore', {
        post
      })
    }).catch(() => {
      res.redirect('/')
    })
  },
  backend: (req, res) => {
    const {username} = req.session
    if (!username) {
      return res.redirect('login')
    }
    Post.findAll({
      include: User
    }).then(posts => {
      res.render('backend', {
        posts
      })
    })
  }
}

module.exports = postController
