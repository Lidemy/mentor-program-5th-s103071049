// 新增
let id = 1
$('form').submit(function(e) {
  event.preventDefault()
  let todo = $('input[name = input-block]').val()
  if (!todo) {
    return
  }
  addTodo(todo, id)
  id++
  $('input[name = input-block]').val('')
})

// 刪除
$(document).on('click', '.btn-outline-danger', function(e) {
  $(e.target).parent().remove()
})

// 清空
$(document).on('click', '.clearall', function(e) {
  $('.complete').remove()
})

// 標記是否完成
$(document).on('click', '.btn-outline-primary', function(e) {
  let node = $(e.target).next().next().next()[0]
  let parentNode = $(e.target).parent().parent().parent()[0]
  $(parentNode).addClass('complete')
  node.classList.toggle('completed')
  if (node.classList.contains('completed')) {
    $(e.target).text('完成')
  } else {
    $(e.target).text('未完成')
    $(parentNode).removeClass('complete')
  }
})

// 編輯
$(document).on('click', '.btn-outline-success', function(e) {
  let node = $(e.target).next().next()[0]
  const originText = node.innerHTML
  node.outerHTML = ''
  parentNode = $(e.target).parent()[0]
  $(parentNode).append(`
    <form class='revise-input'>
      <input type="text" name="revise-block" class="revise-block" placeholder="請輸入">
    </form>
  `)
  $('.revise-input').submit(function(e) {
    event.preventDefault()
    let todo = $('input[name = revise-block]').val()
    $('.revise-input').remove()
    if (todo.length === 0) {
      $(parentNode).append(`<span>${originText}</span>`)
    } else {
      $(parentNode).append(`<span>${todo}</span>`)
    }
  })
})

// 篩選
$(document).on('click', function(e) {
  // 全部
  if ($(e.target).hasClass('all-todos')) {
    $('.todo-card').each(function(index, el) {
      $(el).show()
    })
  }
  // 未完成
  if ($(e.target).hasClass('active-todos')) {
    $('.todo-card').each(function(index, el) {
      if ($(el).hasClass('complete')) {
        $(el).hide()
      } else {
        $(el).show()
      }
    })

  }
  // 已完成
  if ($(e.target).hasClass('completed-todos')) {
    $('.todo-card').each(function(index, el) {
      if ($(el).hasClass('complete')) {
        $(el).show()
      } else {
        $(el).hide()
      }
    })
  }
})

function addTodo(todo, id) {
    $('.card__block').prepend(`
    <div class="card todo-card" style="" data-id = ${id}>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <button type="button" class="btn btn-outline-primary">未完成</button>
          <button type="button" class="btn btn-outline-success">編輯</button>
          <button type="button" class="btn btn-outline-danger">刪除</button>
          <span>${escapeOutput(todo)}</span>
        </li>
      </ul>
    </div>
  `)
}

function escapeOutput(toOutput){
    return toOutput.replace(/\&/g, '&amp;')
        .replace(/\</g, '&lt;')
        .replace(/\>/g, '&gt;')
        .replace(/\"/g, '&quot;')
        .replace(/\'/g, '&#x27')
        .replace(/\//g, '&#x2F');
}
