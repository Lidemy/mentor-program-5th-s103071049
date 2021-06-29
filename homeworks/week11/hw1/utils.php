<?php
  require_once('conn.php');
  function getUserFromUserName($username) {
  	global $conn;
  	$sql = 'select * from s103071049__hw9_users where username = ?';
  	$stmt = $conn->prepare($sql);
  	$stmt->bind_param('s', $username);
  	$stmt->execute();
  	$row = $stmt->get_result();
  	return $row->fetch_assoc();
  }

  function escape($str) {
    $result = htmlspecialchars($str, ENT_QUOTES);
  	return $result;
  }

  function getUserRole($username) {
    global $conn;
    if (!empty($username)) {
      $sql = 'select role from s103071049__hw9_users where username = ?';
      $stmt = $conn->prepare($sql);
      $stmt->bind_param('s', $username);
      $stmt->execute();
      $row = $stmt->get_result();
      $result = $row->fetch_assoc()['role'];
      return $result;
    }
  }
?>

