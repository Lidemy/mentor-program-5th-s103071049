<?php
  require_once('conn.php');
  session_start();
  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($username) || empty($password)) {
  	header('Location: login.php?errCode=1');
  	die('資料未輸入齊全');
  }
  $sql = 'select * from s103071049_week11_hw2_users where username = ? and password = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $password);
  $result = $stmt->execute();
  if (!$result) {
  	die('error' . $conn->error);
  }
  $result = $stmt->get_result();  
  if ($result->num_rows) {
    echo '成功登入';
    header('Location: index.php');
  } else {
  	header('Location: login.php?errCode=2');
  	die('帳號或密碼輸入錯誤');
  }

  $_SESSION['username'] = $username;
?>