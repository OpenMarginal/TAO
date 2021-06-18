<?php

  $link = mysqli_connect('127.0.0.1', 'root', 'root', 'bigweb');

  $sql = "SELECT `cat_one_id` FROM `goods` GROUP BY `cat_one_id`";
  $res = mysqli_query($link, $sql);

  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);
  $arr = array(
    "message" => "获取分类列表成功",
    "code" => 1,
    "list" => $data
  );

  echo json_encode($arr);

?>
