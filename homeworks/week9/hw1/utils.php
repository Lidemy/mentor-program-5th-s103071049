<?php
  require_once('conn.php');

  function getNickname($username) {
  	global $conn;
    $sql = sprintf('select nickname from s103071049__hw9_users where username = "%s"', $username);
    $nickname = $conn -> query($sql) -> fetch_assoc()['nickname'];
    return $nickname;
  }
?>