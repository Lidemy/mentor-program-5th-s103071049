<?php
  require_once('conn.php');
  session_start();
  require_once('utils.php');
  $username = $_SESSION['username'];
  $nickname = getNickname($username);
  $content = $_POST['message__box'];
  
  if (empty($content)) {
  	header('Location: main.php?errCode=1');
  	die('未輸入內容');
  }

  $sql = sprintf(
  	       'insert into s103071049__hw9_comments(nickname, content) values("%s", "%s")'
  	       , $nickname, $content);
  $result = $conn -> query($sql);
  if(!$result) {
  	header('Location: main.php?errCode=2');
  	die ('Error' . $conn -> error);
  }
  header('Location: main.php');
?>