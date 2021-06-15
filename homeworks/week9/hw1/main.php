<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();
  $result = $conn ->query('select * from s103071049__hw9_comments order by id desc');
  if (!$result) {
  	die('錯誤訊息 : ' . $conn ->error);
  }

  $username = Null;
  $nickname = Null;
  if (!empty($_SESSION['username'])) {
  	$username = $_SESSION['username'];
  	$nickname = getNickname($username);
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
			
			<?php if (empty($username)) {?>
			<a href="login.php"><span>登入</span></a>
			<a href="register.php"><span>註冊</span></a>
		    <?php  } else {?>
		    <a href="logout.php"><span>登出</span></a>
		    <?php } ?>
		</div>
		<div class='desc'>
			<h2 class='title'>Comments</h2>
			<h3 class='greeting__word'>你好，<?php echo $nickname?>（＾ω＾）</h3>
			<?php
		    	if (!empty($_GET['errCode'])) {
		    	  $errCode = $_GET['errCode'];
		    	  $msg = 'err';
		    	  if ($errCode === '1') {
		    	    $msg = '請輸入內容再提交 !';
		    	   }
		    	  echo '<h2 class="error__word-noContent"> 錯誤 : ' . $msg .'</h2>';
		    	}
		    ?>
		</div>
		<form method="POST" action="handle_add_comment.php" class='message'>
			<textarea name="message__box" id="message__box" rows="10"></textarea>
			<?php if (!empty($username)){?>
		    <input type="submit" name="submit" class="submit__btn">
		    <?php } else {?>
		    	<h3 class='greeting__word'>請登入您的會員帳號及密碼</h3>
		    <?php }?>
		    <hr>
		</form>
		<?php if (!empty($username)) {?>
		<section>
		<?php  
		  while($row = $result ->fetch_assoc()) {
		?>
			<div class='card'>
				<div class='card__img'></div>
				<div class='card__text'>
					<div class='card__text-title'>
						<span class='nickname'><?php echo $row['nickname']?></span>
						<span class='date'><?php echo $row['create_at']?></span>
					</div>
					<div class='card__text-content'>
						<?php echo $row['content']?>
					</div>
				</div>
			</div>
		<?php }?>
	    <?php  }?>
		</section>
	</div>
</body>
</html>