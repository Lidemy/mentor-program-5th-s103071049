<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  if (empty($_GET['site_key'])) {
    $json = array(
      'ok' => false,
      'msg' => 'please add site_key in url'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_GET['site_key'];
  $sql = 'select * from s103071049_week12_hw1_comments where site_key = ? '. 
    (empty($_GET["before"]) ? '' : 'and id < ? ').
    'order by id desc limit 5';
  $stmt = $conn->prepare($sql);
  if (empty($_GET['before'])) {
    $stmt->bind_param('s', $site_key);
  } else {
    $stmt->bind_param('si', $site_key, $_GET['before']);
  }
  
  $result = $stmt->execute();
  if (!$result) {
    $json = array(
      'ok' => false,
      'msg' => '資料庫傳輸錯誤'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $result = $stmt->get_result();
  $comments = array();
  while($row = $result->fetch_assoc()) {
    array_push($comments, array(
      'id' => $row['id'],
      'nickname' => $row['nickname'],
      'content' => $row['content'],
      'create_at' => $row['create_at']
    ));
  }
  $json = array(
    'ok' => true,
    'comments' => $comments
  );
  $response = json_encode($json);
  echo $response;
  die();
?>