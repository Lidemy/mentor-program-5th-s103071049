<?php
  require_once('conn.php');
  require_once('utils.php');
  
  session_start();
  $username = null;
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
  $id = $_GET['id'];
  $sql = 'select * from s103071049_week11_hw2_posts where id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $stmt->execute();
  $result = $stmt->get_result();
  if (!$result) {
  	die('error' .$conn->error);
  }
  $row = $result->fetch_assoc();
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
					<li><a href="javascript:history.back()">上一頁</a></li>
					<li><a href="write_post.php">發布文章</a></li>
					<li><a href="backend.php">管理後台</a></li>
					<li><a href="logout.php">登出</a></li>
				<?php } else {?>
					<li><a href="javascript:history.back()">上一頁</a></li>
					<li><a href="login.php">登入</a></li>
				<?php }?>
				</ul>
			</div>
		</nav>
		<section class="blog__info">
			<div class="blog__name"><?php echo ($row['title'])?></div>
			<div class="blog__greeting">Welcome to my blog</div>
		</section>
		<div class="content">
				<?php echo ($row['content'])?>
		</div>
  </div>
	<footer>
		Copyright © 2020 Who's Blog All Rights Reserved.
	</footer>
</body>
</html>