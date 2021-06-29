<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();
  $sql = 'select id, nickname, username, role from s103071049__hw9_users';
  $stmt = $conn->prepare($sql);
  $result = $stmt->execute();
  if (!$result) {
  	die('error' . $conn->error);
  }
  $temp = $stmt->get_result();

  $username = $_SESSION['username'];
  $stmt2 = $conn->prepare('select role from s103071049__hw9_users where username = ?');
  $stmt2->bind_param('s', $username);
  $stmt2->execute();
  $temp2 = $stmt2->get_result();
  $user_role = $temp2->fetch_assoc()['role'];
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
				<a href="logout.php" class='logout_btn'><span>登出</span></a>
				<a href="administrator.php" ><span>後台介面</span></a>
				<a href="index.php" ><span>前台介面</span></a>
			</div>
		
		<div class='desc'>
			<h2 class='title'>說明書</h2>
			<h3 class='greeting__word'>你好，管理員，@<?php echo $username?> (＾ω＾)</h3>
		</div>
		<div class="paragraph">
			<h3>一、權限說明</h3>
			<table border=1>
				<tr>
					<th>身份</th>
					<th>權限</th>
					<th>說明</th>					
				</tr>
				<tr>
					<td>一般使用者</td>
					<td>0</td>
					<td>可以新增留言，且編輯與刪除自己的留言</td>
				</tr>
				<tr>
					<td>管理員</td>
					<td>1</td>
					<td>可以新增留言，也可以編輯與刪除任意留言</td>
				</tr>
				<tr>
					<td>遭停權使用者</td>
					<td>2</td>
					<td>不能新增留言，但是可以編輯與刪除自己的留言</td>
				</tr>
				<tr>
					<td>小編</td>
					<td>3</td>
					<td>可以瀏覽以及編輯所有文章，但不能刪除與新增任意留言</td>
				</tr>
			</table>

		</div>
</body>
</html>