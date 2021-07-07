<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();
  $username = $_SESSION['username'];
  $content = $_POST['content'];
  $id = $_POST['id'];
  if (empty($content)) {
    header('Location: update_content.php?errCode=1&id=' .$id);
  	die('未輸入內容');
  }

  $user_role = getUserRole($username);
  if ($user_role === 1 || $user_role === 3) {
    $sql = 'update s103071049__hw9_comments set content = ? where id = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('si', $content, $id);
  } else {
    $sql = 'update s103071049__hw9_comments set content = ?  where id = ? and username = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('sis', $content, $id, $username);
  }

  $result = $stmt->execute();
  if (!$result) {
  	die('error ' . $conn->error);
  }
  header('Location: index.php');
?>


