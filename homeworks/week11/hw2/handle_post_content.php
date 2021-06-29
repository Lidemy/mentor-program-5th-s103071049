<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();
  $username = $_SESSION['username'];
  $role = getRoleFromUsername($username);
  if (empty($username) || ($role !== 1)) {
  	header('Location: index.php');
  	die('用戶無此權限');
  }

  $text = $_POST['editor1'];
  $title = $_POST['title'];
  if (empty($title)) {
  	header('Location: write_post.php?errCode=1');
  	die('未輸入標題');
  }
  if (empty($text)) {
  	header('Location: write_post.php?errCode=2');
  	die('未輸入內文');
  }
  
  $sql = 'insert into s103071049_week11_hw2_posts(title, content) values(?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $title, $text);
  $result = $stmt->execute();
  if (!$result) {
  	die('error' . $conn->error);
  }
  echo '新增成功';
  header('Location: index.php');
?>

