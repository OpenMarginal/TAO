<?php
  $current = $_GET['current'];
  $pagesize = $_GET['pagesize'];
  $catename = $_GET['catename'];
  $ispromote = $_GET['ispromote'];
  $sortType = $_GET['sortType'];
  $sort = $_GET['sort'];
  $sql = "SELECT * FROM `goods` WHERE `cat_one_id`='$catename'";
  if ($ispromote == 0) {
    $sql = $sql . " AND `is_promote`=0";
  } else if ($ispromote == 1) {
    $sql = $sql . " AND `is_promote`=1";
  }

  if ($sortType == 1) {
    $sql = $sql . " ORDER BY `goods_id` $sort";
  } else if ($sortType == 2) {
    $sql = $sql . " ORDER BY `goods_price` $sort";
  } else if ($sortType == 3) {
    $sql = $sql . " ORDER BY `goods_number` $sort";
  }

  $start = ($current - 1) * $pagesize;
  $sql = $sql . " LIMIT $start, $pagesize";

  $link = mysqli_connect('localhost', 'root', 'root', 'bigweb');
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);

  $arr = array(
    "message" => "获取商品列表成功",
    "code" => 1,
    "list" => $data
  );

  echo json_encode($arr);

?>
