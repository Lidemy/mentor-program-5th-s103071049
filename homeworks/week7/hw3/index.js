const todoInputDom = document.querySelector('.input input')
todoInputDom.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    addTodos()
  }
})

// 新增 todo-list
function addTodos() {
  const inputValue = todoInputDom.value
  if (!inputValue) {
    return
  }
  const newTodo = document.createElement('div')
  newTodo.classList.add('items-group')
  newTodo.innerHTML = `
    <input type="checkbox" name="btn" class="todo__check">
    <li class="item">${escapeHtml(inputValue)}</li>
    <button class="btn-delete"></button>
  `
  document.querySelector('.items').appendChild(newTodo)
  document.querySelector('.input input').value = ''
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

document.querySelector('.items').addEventListener('click', (e) => {
  // 刪除
  if (e.target.classList.contains('btn-delete')) {
    e.target.parentNode.remove()
    return
  }
  // 完成代辦
  if (e.target.classList.contains('todo__check')) {
    // console.log(e.target.checked)
    if (e.target.checked) {
      e.target.parentNode.classList.add('done')
    } else {
      e.target.parentNode.classList.remove('done')
    }
  }
})
