<?php
  require_once('conn.php');
  session_start();
  $username = $_POST['username'];
  $nickname = $_POST['nickname'];
  $password = $_POST['password'];
  if (empty($username) || empty($nickname) || empty($password)) {
  	header('Location: register.php?errCode=1');
  	die('資料未輸入完整');
  }
  $sql = sprintf('insert into s103071049__hw9_users(username, nickname, password) values("%s", "%s", "%s")', $username, $nickname, $password);
  $result = $conn -> query($sql);
  if (!$result) {
  	$code = $conn -> errno;
  	if ($code === 1062) {
      header('Location: register.php?errCode=2');
  	}
  	die($conn->error);
  }
  echo '新增成功';
  header('Location: main.php');
?>