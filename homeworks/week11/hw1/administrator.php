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
			<?php if ($user_role!==1) {?>
				<?php session_destroy();?>
				<?php header('Location: index.php');?>
			<?php } else {?>
				<a href="logout.php" class='logout_btn'><span>登出</span></a>
				<a href="index.php" ><span>前台介面</span></a>
				<a href="document.php" ><span>說明書</span></a>
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
			<h2 class='title'>後台管理系統</h2>
			<h3 class='greeting__word'>你好，管理員，@<?php echo $username?> (＾ω＾)</h3>
		</div>
		
			<table border=1>
				<tr>
					<th>使用者</th>
					<th>暱稱</th>
					<th>權限</th>
					<th>身份</th>
					<th>調整</th>
				</tr>
				<?php while ($row = $temp->fetch_assoc()) {?>
				<?php $id = $row['id']?>
				<tr>
					<td><?php echo $row['username']?></td>
					<td><?php echo $row['nickname']?></td>
					<td><?php echo $row['role']?></td>
					<?php if ($row['role']===0) {?>
						<td>一般使用者</td>
					<?php }?>
					<?php if ($row['role']===1) {?>
						<td>管理員</td>
					<?php }?>
					<?php if ($row['role']===2) {?>
						<td>遭停權者</td>
					<?php }?>
					<?php if ($row['role']===3) {?>
						<td>小編</td>
					<?php }?>
				<form action="handle_authority.php" method="POST">
					<td>
						<select name="authority" id="authority">
							<option value="">請調整使用者權限</option>
							<option value="0">一般使用者</option>
							<option value="1">管理員</option>
							<option value="2">遭停權者</option>
							<option value="3">小編</option>
						</select>
						<input type="hidden" name="id" value="<?php echo $id ?>">
						<input type="submit">
					</td>

				</form>
				</tr>
				<?php }?>
			</table>
			<?php }?>
</body>
</html>