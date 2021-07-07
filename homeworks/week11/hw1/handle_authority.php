<?php
  require_once('conn.php');
  session_start();
  $username = $_SESSION['username'];
  $id = $_POST['id'];
  $role = $_POST['authority'];
  $sql = 'update s103071049__hw9_users set role = ? where id = ?';
  $stmt = $conn->prepare($sql);
  $result = $stmt->bind_param('si', $role, $id);
  if (!$result) {
  	die('error ' .$conn->error);
  }
  $stmt->execute();
  header('Location: administrator.php');
?>