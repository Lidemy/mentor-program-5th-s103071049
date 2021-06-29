<?php
  require_once('conn.php');
  require_once('utils.php');
  session_start();
  $username = $_SESSION['username'];
  $role = getRoleFromUsername($username); 

  if (empty($username) || ($role!==1)) {
  	header('Location: index.php');
  	die('用戶無此權限');
  }

  $id = $_GET['id'];
  $sql = 'update s103071049_week11_hw2_posts set is_deleted = 1  where id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
  $result = $stmt->execute();
  if (!$result) {
  	die('error' .$conn->error);
  }
  header('Location: index.php');

?>