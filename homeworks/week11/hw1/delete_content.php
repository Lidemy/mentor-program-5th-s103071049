<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();
  $id = $_GET['id'];
  $username = $_SESSION['username'];
  $user_role = getUserRole($username);

  if (empty($id)) {
    header('Location: index.php?errCode=1');
    die('未輸入內容');
  }
  
  if ($user_role === 1) {
    $sql = 'update s103071049__hw9_comments set is_deleted = 1 where id = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id);
  } else {
    $sql = 'update s103071049__hw9_comments set is_deleted = 1 where id = ? and username = ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('is', $id, $username);
  }
  $result = $stmt->execute();
  if (!$result) {
  	die('error '. $conn->error);
  }
  header('Location: index.php');
?>