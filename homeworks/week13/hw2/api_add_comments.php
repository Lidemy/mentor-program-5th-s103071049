<?php
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  if (empty($_POST['content']) || empty($_POST['nickname']) || empty($_POST['site_key'])) {
    $json = array(
      'ok' => false,
      'msg' => 'please input missing fields'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $nickname = $_POST['nickname'];
  $site_key = $_POST['site_key'];
  $content = $_POST['content'];

  $sql = 'insert into  s103071049_week12_hw1_comments(nickname, site_key, content) 
    values(?, ?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $nickname, $site_key, $content);
  $result = $stmt->execute();

  if (!$result) {
    $json = array(
      'ok' => false,
      'msg' => '資料庫處理錯誤'
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  $json = array(
    'ok' => true,
    'msg' => 'success'
  );
  $response = json_encode($json);
  echo $response;
  die();
?>