<?php
  require_once('conn.php');
  session_start();
  $nickname = $_POST['nickname'];
  $username = $_SESSION['username'];
  if (empty($nickname)) {
    header('location: index.php?errCode=1');
  	die('未輸入內容');
  }
  $sql = 'update s103071049__hw9_users set nickname = ? where username = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $username);
  $result = $stmt->execute();
  if (!$result) {
  	die('err' . $conn->error);
  }
  header('Location: index.php');
?>