<?php
  $ispromote = $_GET['ispromote']; 
  $catename = $_GET['catename'];


  $sql = "SELECT count(*) c FROM `goods` WHERE `cat_two_id`='$catename'";
  
  $link = mysqli_connect('localhost', 'root', 'root', 'bigweb');
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);

  $arr = array(
    "message" => "获取总数成功",
    "code" => 1,
    "count" => $data[0]['c']
  );

  echo json_encode($arr);



?>
