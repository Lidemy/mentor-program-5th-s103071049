const siteKey = 'angela'
const lodaMoreButtonHTML = '<button type="submit" class="load-more btn btn-primary">載入更多</button>'
let lastId = null
let isEnd = false
$(document).ready(() => {
  getComments()
  $('.comments__list').on('click', '.load-more', () => {
    getComments()
  })
  $('.add-comment-form').submit( (e) => {
    e.preventDefault()
    const datas = {
      'site_key': 'angela',
      'nickname' : $('input[name=nickname]').val(),
      'content' : $('textarea[name=content]').val(),
    }
    $.ajax({
      type: 'POST',
      url: 'http://localhost/angela/%e7%95%99%e8%a8%80%e6%9d%bf/TEST/week12/hw1/api_add_comments.php',
      data: datas
    }).done(function(data) {
      if (!data.ok) {
        alert(data.msg)
        return
      }
      $('input[name=nickname]').val(''),
      $('textarea[name=content]').val('')
      const commentToDom = $('.comments__list')
      appendCommentToDom(commentToDom, datas, true)
    })
  })
})

function escape(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
 }

function appendCommentToDom(container, comment, isPrepend) {
  const html = `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">${comment.id} ${escape(comment.nickname)}</h5>
      <p class="card-text">${escape(comment.content)}</p>
    </div>
  </div>
  `
  if (isPrepend) {
    container.prepend(html)
  } else {
    container.append(html)
  }
}

function getCommentsAPI(siteKey, before, cb) {
  let url = "http://localhost/angela/%e7%95%99%e8%a8%80%e6%9d%bf/TEST/week12/hw1/api_comments.php?site_key=" + siteKey
  if (before) {
    url += '&before=' + before
  }
  $.ajax({
  url,
  }).done(function(data) {
    cb(data)
  })
}

function getComments() {
    const commentToDom = $('.comments__list')
    $('.load-more').hide('')
    if (isEnd) {
      return
    }
    getCommentsAPI(siteKey, lastId, data => {
    if (!data.ok) {
      alert(data.msg)
      return
    }
    const comments = data.comments
    for (let comment of comments) {
      appendCommentToDom(commentToDom, comment, false)
    }
    let length = comments.length
    if (length === 0) {
      isEnd = true
      $('.load-more').hide('')
    } else {
      lastId = comments[length-1].id
      $('.comments__list').append(lodaMoreButtonHTML)
    }
  })
}