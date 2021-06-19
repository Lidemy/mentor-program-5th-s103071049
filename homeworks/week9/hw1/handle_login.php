<?php
  require_once('conn.php');
  session_start();
  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($username) || empty($password)) {
  	header('Location: login.php?errCode=1');
  	die('資料未輸入齊全');
  }

  $sql = sprintf('select * from s103071049__hw9_users where username="%s" and password="%s"', $username, $password);
  $result = $conn -> query($sql);
  if ($result -> num_rows) {
  	$_SESSION['username'] = $username;
  	header('Location: main.php');
  } else {
  	header('Location: login.php?errCode=2');
    die('帳密輸入錯誤');
  }
?>