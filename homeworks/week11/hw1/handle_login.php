<?php
  require_once('conn.php');
  session_start();

  $username = $_POST['username'];
  $password = $_POST['password'];
  if (empty($username) || empty($password)) {
    header('Location: login.php?errCode=1');
    die('資料未輸入齊全');
  }
  $sql = 'select * from s103071049__hw9_users where username = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  if (!$result) {
  	die('error' . $conn->error);
  }
  $result = $stmt->get_result();
  if ($result->num_rows === 0) {
  	header('Location: login.php?errCode=2');
  	die('帳號密碼輸入錯誤');
  }
  $row = $result->fetch_assoc();
  if (password_verify($password, $row['password'])){
  	$_SESSION['username'] = $username;
    $role = $row['role'];
    if ($role === 1) {
      header('Location: administrator.php');
    } else {
      header('Location: index.php');
    }
  	
  } else {
  	header('Location: login.php?errCode=2');
  	die('帳號密碼輸入錯誤');
  }

?>