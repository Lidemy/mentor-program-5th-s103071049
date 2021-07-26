<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <title>Week12 HW2</title>
  <script src= 'https://code.jquery.com/jquery-3.6.0.min.js'></script>
  <style>
    button {
      margin-right: 8px;
    }
    .title {
      text-align: center;
      font-size: 36px;
    }
    .form-control {
      text-align: center;
    }
    .completed{
      text-decoration: line-through;
    }
    .revise-input {
      display: inline;
    }
  </style>

</head>
<body>
  <div class="container">
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link all-todos" aria-current="page" href="#">ALL</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active-todos" href="#">Active</a>
        </li>
        <li class="nav-item">
          <a class="nav-link completed-todos" href="#">Completed</a>
        </li>
        <li class="nav-item">
          <a class="nav-link clearall" href="#" tabindex="-1">Clear Completed</a>
        </li>
      </ul>
      <div class="card">
        <div class="card-body title">
          todos
        </div>
      </div>
      <form>
        <input type="text" name="input-block" class="form-control" placeholder="請輸入代辦事項">
        <div class="card__block">
          <div class="card todo-card" style="">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <button type="button" class="btn btn-outline-primary">未完成</button>
                <button type="button" class="btn btn-outline-success">編輯</button>
                <button type="button" class="btn btn-outline-danger">刪除</button>
                <span>An item</span>
              </li>
            </ul>
          </div>
        </div>
      </form>
  </div>
  <script src="index.js"></script>
</body>
</html>