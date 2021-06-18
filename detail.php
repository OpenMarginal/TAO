<?php
  $goodsId = $_GET['goodsId'];

  $link = mysqli_connect('localhost', 'root', 'root', 'bigweb');
  $sql = "SELECT * FROM `goods` WHERE `goods_id`=$goodsId";
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);

  $arr = array(
    "message" => "获取商品信息成功",
    "code" => 1,
    "info" => $data[0]
  );
  echo json_encode($arr);

?>
