<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Week12 留言板</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        .card {
            margin-top: 12px;
            margin-bottom: 12px;
        }
    </style>
    <script src="index.js"></script>
</head>
<body>
    <div class="container">
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
</body>
</html>
