<?php
require_once('conn.php');
$result = $conn->query('select C.id as id, C.create_at as create_at, C.content as content, C.username as username ,U.nickname as nickname from s103071049__hw9_comments as C left join s103071049__hw9_users as U on C.username = U.username order by C.id desc');
if (!$result) {
  die ('error:' .$conn->error);
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>HW8 留言板</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<div class='warning'>
		注意!本站為練習用網站，因教學用途刻意忽略資安的實作， 註冊時請勿使用任何真實的帳號或密碼。
	</div>
	<div class='content'>
		<div class='btn'>
			<a href="index.php"><span>首頁</span></a>
			<a href="login.php"><span>登入</span></a>
			<?php
			  if (!empty($_GET['errCode'])) {
			    $msg = '錯誤';
			    $code = $_GET['errCode'];
			    if ($code === '1') {
			    	$msg = '資料未輸入齊全';
			    }
			    if ($code === '2') {
			    	$msg = '帳號已被註冊';
			    }
			    echo "<h2 class='error__msg'>". $msg ."</h2>";
			  }
			?>
		</div>
		<div class='desc'>
			<h2 class='title'>註冊頁面</h2>
			<h3 class='greeting__word'>你好 （＾ω＾）</h3>
			<form action="handle_register.php" method="POST">
				<div class="register">
					<div>帳號：<input type="text" name="username"></div>
					<div>暱稱：<input type="text" name="nickname"></div>
					<div>密碼：<input type="text" name="password"></div>
					<input type="submit" name="submit" class="submit__btn">
				</div>
			</form>
		</div>
	</div>
</body>
</html>