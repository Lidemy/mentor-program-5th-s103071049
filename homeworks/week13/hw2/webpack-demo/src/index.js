import { getComments, addComments} from './api'
import { appendCommentToDom, appendStyle} from './utils'
import { cssTemplate, getLoadMoreButton, getForm} from './templates'
import $ from 'jquery'

export function init(options) {
  let siteKey = ''
  let apiUrl = ''
  let containerElement = null
  let commentDom = null
  let lastId = null
  let isEnd = false
  let loadMoreClassName
  let commentsClassName
  let commentsSelector
  let formClassName
  let formSelector

  siteKey = options.siteKey
  apiUrl = options.apiUrl
  loadMoreClassName = `${siteKey}-load-more`
  commentsClassName = `${siteKey}-comments`
  commentsSelector = '.' + commentsClassName
  formClassName = `${siteKey}-add-comment-form`
  formSelector = '.' + formClassName

  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassName))
  appendStyle(cssTemplate)

  commentDom = $(commentsSelector)
  getNewComments()
  $(commentsSelector).on('click', '.' + loadMoreClassName, () => {
    getNewComments()
  })
  $(formSelector).submit( (e) => {
    e.preventDefault()
    const nickNameDom = $(`${formSelector} input[name=nickname]`)
    const contentDom = $(`${formSelector} textarea[name=content]`)
    const datas = {
      'site_key': siteKey,
      'nickname' : nickNameDom.val(),
      'content' : contentDom.val(),
    }
    addComments(apiUrl, siteKey, datas, data => {
      if (!data.ok) {
        alert(data.msg)
        return
      }
      nickNameDom.val(''),
      contentDom.val('')
      const commentToDom = $(commentsSelector)
      appendCommentToDom(commentToDom, datas, true)
    })
  })
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

  function getNewComments() {
      const commentToDom = $(commentsSelector)
      $('.' + loadMoreClassName).hide('')
      if (isEnd) {
        return
      }
      getComments(apiUrl ,siteKey, lastId, data => {
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
        $('.' + loadMoreClassName).hide('')
      } else {
        lastId = comments[length-1].id
        const lodaMoreButtonHTML = getLoadMoreButton(loadMoreClassName)
        $(commentsSelector).append(lodaMoreButtonHTML)
      }
    })
  }
}
