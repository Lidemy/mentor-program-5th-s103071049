<?php
  require_once('conn.php');
  session_start();
  $username = $_POST['username'];
  $nickname = $_POST['nickname'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
  if (empty($username) || empty($nickname) || empty($password)) {
    header('Location:register.php?errCode=1');
  	die('資料未輸入齊全');
  }
  $sql = 'insert into s103071049__hw9_users(username, nickname, password) values(?, ?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $username, $nickname, $password);
  $result = $stmt->execute();
  
  if (!$result) {
  	if ($conn->errno === 1062) {
  	  header('Location: register.php?errCode=2');
  	  die('帳號已被註冊');
  	}
  	die ('錯誤 ' . $conn->error);
  }
  $_SESSION['username'] = $username;
  header('Location: index.php');
?>