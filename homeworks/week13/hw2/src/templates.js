export const cssTemplate = `
  .card {
    margin-top: 12px;
    margin-bottom: 12px;
  }
  body {
    padding: 12px;
  }
`

export function getLoadMoreButton(className) {
  return `<button type="submit" class="${className} btn btn-primary">載入更多</button>`
}

export function getForm(className, commentsClassName) {
  return `
  <div>
    <form class="${className}">
       <label class="form-label">暱稱</label>
       <input type="text" class="form-nickname" name="nickname">
      <div class="mb-3">
        <label class="form-label">留言內容</label>
        <textarea class="form-control" rows="3" name="content"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">送出留言</button>
    </form>
    <div class="${commentsClassName}">
    </div>
  </div>
`
}