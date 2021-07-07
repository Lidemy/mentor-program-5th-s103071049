<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();
  
  $username = NULL;
  $nickname = NULL;
	
  $page = 1;
  $items_per_page = 5;
  
  if (!empty($_GET['page'])) {
  	$page = $_GET['page'];
  }
  $offset = ($page-1) * $items_per_page;
  $stmt = $conn->prepare('select C.id as id, C.create_at as create_at, C.content as content, C.username as username ,U.nickname as nickname from s103071049__hw9_comments as C left join s103071049__hw9_users as U on C.username = U.username where is_deleted is null order by C.id desc limit ? offset ?');
  $stmt->bind_param('ii', $items_per_page, $offset);
  
  
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUserName($username);
    $nickname = $user['nickname'];
  }
  $result = $stmt->execute();
  if (!$result) {
    die ('error:' . $conn->error);
  }

  $result = $stmt->get_result();
  
  $user_role = getUserRole($username);
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
			<?php if (!$username) {?>
				<a href="register.php"><span>註冊</span></a>
				<a href="login.php"><span>登入</span></a>
			<?php } else {?>
				<a href="logout.php" class='logout_btn'><span>登出</span></a>
				<?php if ($user_role === 1) { ?>
					<a href="administrator.php"><span>後台介面</span></a>
				<?php }?>
				<form action="handle_update_nickname.php" method= "POST">
					<span class= 'btn__update-nickname'>修改暱稱</span>
					<div class='update__nickname-block hide'>
						<input type="text" name="nickname">
						<input type="submit">
					</div>
				</form>
			<?php }?>
			</div>
			<?php
			  if (!empty($_GET['errCode'])) {
			    $msg = '錯誤';
			    $code = $_GET['errCode'];
			    if ($code === '1') {
			    	$msg = '未輸入內容';
			    }
			    echo "<h2 class='error__msg'>". $msg ."</h2>";
			  }
			?>
		
		<div class='desc'>
			<h2 class='title'>Comments</h2>
			<h3 class='greeting__word'>你好 (＾ω＾)&emsp;<?php echo escape($nickname)?></h3>
		</div>
		<form class='message' method="post" action="handle_add_comments.php">
		    <textarea name="content" id="message__box" rows="10"></textarea>
		    <?php if ($username && ($user_role !== 2) && ($user_role !== 3)) {?>
		    	<input type="submit" name="submit" class="submit__btn">
		    	<hr>
				<?php }?>
				<?php if ($username && ($user_role === 2)){?>
					<h3 class='warning__message'>你已被停權</h3>
				<?php }?>
				<?php if ($username && ($user_role === 3)){?>
					<h3 class='warning__message'>小編權限不含新增留言</h3>
				<?php }?>
		</form>
		<?php if ($username) {?>
			<section>
			  <?php while ($row = $result->fetch_assoc()) {?>
				<div class='card'>
					<div class='card__img'></div>
					<div class='card__text'>
						<div class='card__text-title'>
							<span class='nickname'><?php echo escape($row['nickname']) ?></span>
							<span class='username'> (@<?php echo escape($row['username'])?>)</span>
							<span class='date'><?php echo escape($row['create_at'])?></span>
							<?php if ($row['username'] === $username || ($user_role === 1) || ($user_role === 3)) {?>
									<a href="update_content.php?id=<?php echo $row['id']?>" class="update__content-btn">編輯</a>
							<?php }?>
							<?php if ($row['username'] === $username || ($user_role === 1)) {?>
									<a href="delete_content.php?id=<?php echo $row['id']?>" class="update__content-btn">刪除</a>
							<?php }?>
						</div>
						<div class='card__text-content'><?php echo escape($row['content'])?></div>
					</div>
				</div>
			  <?php }?>
			</section>
		<?php }?>
		<?php if ($username) { ?>
			<hr>
		<?php }?>
	</div>

	<?php
       $sql = 'select count(id) as count from s103071049__hw9_comments where is_deleted is null';
       $stmt = $conn->prepare($sql);
       $stmt->execute();
       $result = $stmt->get_result();
       $row = $result->fetch_assoc();
       $total_comments = $row['count'];
       $total_pages = ceil($total_comments/$items_per_page);

	?>
	<?php if ($username) {?>
		<div class="page__info">
			<span>總留言數 : <?php echo $total_comments?>，頁數 : </span>
			<span><?php echo $page?>/<?php echo $total_pages?></span>
		</div>
		<div class="page__narator">
			<?php if ($page != 1) {?>
				<a href="index.php?page=1">最前頁</a>
				<a href="index.php?page=<?php echo $page-1?>">上一頁</a>
			<?php }?>
			<?php if ($page != $total_pages) {?>
				<a href="index.php?page=<?php echo $page+1?>">下一頁</a>
				<a href="index.php?page=<?php echo $total_pages?>">最末頁</a>
			<?php }?>
		</div>
	<?php }?>
  	<script src="index.js"></script>
</body>
</html>