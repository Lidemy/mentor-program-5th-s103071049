<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();
  $username = NULL;

  $id = $_GET['id'];
  $sql = 'select * from s103071049__hw9_comments where id = ?';
  $stmt = $conn->prepare($sql);
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
    $user = getUserFromUserName($username);
  }
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
  	die('error ' . $conn->error);
  }
  $temp = $stmt->get_result();
  $row = $temp->fetch_assoc();
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
			<?php
			  if (!empty($_GET['errCode'])) {
			    $msg = '錯誤';
			    $code = $_GET['errCode'];
			    if ($code === '1') {
			    	$msg = '資料未輸入齊全';
			    }
			    echo "<h2 class='error__msg'>". $msg ."</h2>";
			  }
			?>
		
		<div class='desc'>
			<h2 class='title'>編輯留言</h2>
		</div>
		<form class='message' method="post" action="handle_update_content.php">
		    <textarea name="content" id="message__box" rows="10"><?php echo $row['content']?></textarea>
		    <input type="hidden" name="id" value="<?php echo $row['id']?>">
		    <input type="submit" name="submit" class="submit__btn" value="編輯完成">
		    <hr>
		</form>
	</div>
</body>
</html>