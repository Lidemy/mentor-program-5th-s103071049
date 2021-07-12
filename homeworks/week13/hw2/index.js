let siteKey = ''
let apiUrl = ''
let containerElement = null
let commentDom = null
let lastId = null
let isEnd = false
const lodaMoreButtonHTML = '<button type="submit" class="load-more btn btn-primary">載入更多</button>'
const formTemplate = `
  <div>
    <form class="add-comment-form">
       <label for="form-nickname" class="form-label">暱稱</label>
       <input type="text" class="form-nickname" id="form-nickname" name="nickname">
      <div class="mb-3">
        <label for="comments__block" class="form-label">留言內容</label>
        <textarea class="form-control" id="comments__block" rows="3" name="content"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">送出留言</button>
    </form>
    <div class="comments__list">
    </div>
  </div>
`
const css = `
  .card {
      margin-top: 12px;
      margin-bottom: 12px;
  }
  body {
      padding: 12px;
  }
`
function init(options) {
  siteKey = options.siteKey
  apiUrl = options.apiUrl
  containerElement = $(options.containerSelector)
  containerElement.append(formTemplate)
  commentDom = $('.comments__list')
  const styleElement = document.createElement('style') // 新建立一個 style 元素
  styleElement.type = 'text/css' // 指定 styleElement 的 type
  styleElement.appendChild(document.createTextNode(css)
  document.head.appendChild(styleElement) // 將 styleElement 給放進去
  getComments()
  $('.comments__list').on('click', '.load-more', () => {
    getComments()
  })
  $('.add-comment-form').submit( (e) => {
    e.preventDefault()
    const datas = {
      'site_key': siteKey,
      'nickname' : $('input[name=nickname]').val(),
      'content' : $('textarea[name=content]').val(),
    }
    $.ajax({
      type: 'POST',
      url: `${apiUrl}/api_add_comments.php`,
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
}

$(document).ready( () => {
  init({
    siteKey: 'angela',
    apiUrl: 'http://mentor-program.co/mtr04group3/s103071049/week12/hw1',
    containerSelector: '.comments-area'
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
  let url = `${apiUrl}/api_comments.php?site_key=` + siteKey
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