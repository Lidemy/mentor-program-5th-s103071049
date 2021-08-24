<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();
  $username = null;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>部落格</title>
	<link rel="stylesheet" href="style.css">
</head>

<body>
	<div class="wrap">
		<nav>
			<div class="content__block">
			<div class = "blog__title">Who's Blog</div>
				<ul>
					<li><a href="#">文章專區</a></li>
					<li><a href="#">分類專區</a></li>
					<li><a href="#">關於我</a></li>
				</ul>
			</div>
			<div class="management__block">
				<ul>
				<?php if ($username) {?>
					<li><a href="index.php">首頁</a></li>
					<li><a href="backend.php">管理後台</a></li>
					<li><a href="logout.php">登出</a></li>
				<?php } else {?>
					<li><a href="login.php">登入</a></li>
				<?php }?>
				</ul>
			</div>
		</nav>
		<section class="blog__info">
			<div class="blog__name">存放技術之地</div>
			<div class="blog__greeting">Welcome to my blog</div>
		</section>
		<?php
		  if (!empty($_GET['errCode'])) {
		  	$msg = '錯誤訊息';
		  	$code = $_GET['errCode'];
		  	if ($code === '1') {
		  		$msg = '未輸入標題';
		  	}
		  	if ($code === '2') {
		  		$msg = '未輸入內文';
		  	}
		    echo '<h2 class="err__msg">' . $msg .'</h2>'; 
		  }
		?>
		<section class="blog__post_comments">
			<form action="handle_post_content.php" method="POST" clsss="text__block">
				<textarea name="content" cols="30" rows="10"></textarea>
				<input type="submit" value="Submit" class="submit__btn">
			</form>
			
		</section>
	</div>
	<footer>
		Copyright © 2020 Who's Blog All Rights Reserved.
	</footer>
</body>
</html>