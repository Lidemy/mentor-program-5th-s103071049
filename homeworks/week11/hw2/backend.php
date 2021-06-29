<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();
  $username = null;  
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }
  $role = getRoleFromUsername($username);
  if (empty($username) || $role!==1) {
  	header('Location:index.php');
  	die('用戶無此權限');
  }
  $sql = 'select * from s103071049_week11_hw2_posts where is_deleted is null order by id desc';
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if (!$result) {
  	die ('error' . $conn->error);
  }
  $result = $stmt->get_result();
  
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
					<li><a href="write_post.php">發布文章</a></li>
					<li><a href="logout.php">登出</a></li>
				<?php } else {?>
					<li><a href="login.php">登入</a></li>
				<?php }?>
				</ul>
			</div>
		</nav>
		<section class="blog__info">
			<div class="blog__name">後台管理</div>
			<div class="blog__greeting">Welcome back boss</div>
		</section>
	</div>
		<section class="blog__post">
			<?php while ($row = $result->fetch_assoc()) {?>
				<div class="backend__post">
					<div class="post__upper-block">
						<div class="post__title"><?php echo $row['title']?></div>
						<form class="post__btn" method='GET'>
						<?php if ($username) {?>
							<a href="update.php?id=<?php echo $row['id']?>" class="post__update-btn">編輯</a>
							<a href="delete.php?id=<?php echo $row['id']?>" class="post__update-btn">刪除</a>
							<a href="read.php?id=<?php echo $row['id']?>" class="post__update-btn">瀏覽</a>
						<?php }?>
						</form>
						
					</div>
						<div class="post__info">
							<img src="./watch.png" alt="time-img">
							<div class='time'><?php echo $row['current_at']?></div>
							<img src="./folder.png" alt="folder-img">
							<div class="annoucement">歷史公告</div>
						</div>
				</div>
			<?php }?>
		</section>		
	<footer>
		Copyright © 2020 Who's Blog All Rights Reserved.
	</footer>
</body>
</html>