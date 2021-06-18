<?php
$pid = $_GET['ejcd'];

$link = mysqli_connect('127.0.0.1','root','root','bigweb');

$sql = "SELECT `cat_two_id` FROM `goods` WHERE `cat_one_id`='$pid' GROUP BY `cat_two_id`";
$res = mysqli_query($link,$sql);

$data = mysqli_fetch_all($res, MYSQLI_ASSOC);
$arr = array(
  "message" => "获取分类列表成功",
  "code" => 1,
  "list" => $data
);
echo json_encode($arr);
