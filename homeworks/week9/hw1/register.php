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
			<a href="main.php"><span>回首頁</span></a>
			<a href="login.php"><span>登入</span></a>
		</div>
		<div class='desc'>
			<h2 class='title'>Register</h2>
			<?php if (empty($_GET['errCode'])) {?>
			 <h3 class='greeting__word'>歡迎註冊 ✧*｡٩(ˊᗜˋ*)و✧*｡ </h3>
			<?php }?>
			<?php
       if (!empty($_GET['errCode'])) {
         $code = $_GET['errCode'];
         $msg = 'Error';
         if ($code === '1') {
           $msg = '資料未輸入完整';
         } else if ($code === '2') {
         	 $msg = '帳號已被註冊';
         }
        echo "<h3 class='error__word'>" . $msg ."  _(┐「﹃ﾟ｡)_ </h3>";
       }
			?>
			
		</div>
		<form method="POST" action="handle_register.php" class='message'>
			  <div>帳號 : <input type="text" name="username" class='register_input'></div>
			  <div>暱稱 : <input type="text" name = "nickname" class='register_input'></div>
			  <div>密碼 : <input type="password" name="password" class='register_input'></div>
		    <input type="submit" name="submit" class="submit__btn">
		    <hr>
		</form>
	</div>
</body>
</html>