<?php
  require_once('conn.php');

  function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
  }

  function getRoleFromUsername($username) {
  	global $conn;
    $stmt = $conn->prepare('select * from s103071049_week11_hw2_users where username = ?');
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $row = $stmt->get_result();
    $role = $row->fetch_assoc()['role'];
    return $role;
  }
?>