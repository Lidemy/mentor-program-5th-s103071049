<?php
  require_once('conn.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" href="login.css">
</head>
<body>
	<div class="wrap">
		<div class="title">Log In</div>
		<?php 
		 if (!empty($_GET['errCode'])) {
		 	$msg = 'Oops! error';
		 	$code = $_GET['errCode'];
		 	if ($code === '1') {
		 		$msg = '資料未輸入齊全';
		 	}
		 	if ($code === '2') {
		 		$msg = '帳號或密碼輸入錯誤';
		 	}
		 	echo '<h3 class="err__meg">'. $msg .'</h3>';
		 }
		?>
		<form action="handle_login.php" method="POST">
			<div class="input__block">
				<div class="input__title">USERNAME</div>
				<input type="text" placeholder="請輸入帳號" name="username">
			</div>
			<div class="input__block">
				<div class="input__title">PASSWORD</div>
				<input type="password" placeholder="請輸入密碼" name="password">
			</div>
			<div class="submit__block">
				<input type="submit" value="SIGN IN">
			</div>
		</form>
	</div>	
</body>
</html>