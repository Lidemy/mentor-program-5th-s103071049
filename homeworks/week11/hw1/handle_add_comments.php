<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();
  $content = $_POST['content'];
  if (empty($content)) {
    header('Location:index.php?errCode=1');
    die('未輸入內容');
  }
  $username = $_SESSION['username'];
  $user_role = getUserRole($username);
  if ($user_role === 2 || $user_role === 3) {
    header('Location:index.php');
    exit();
  }
  $sql = 'insert into s103071049__hw9_comments(username, content) values(?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $username, $content);
  $result = $stmt->execute();
  if (!$result) {
    die("error" . $conn->error);
  }
  header('Location:index.php');
?>