<?php
$username = $_GET['username'];
$password = $_GET['password'];

$link = mysqli_connect('127.0.0.1','root','root','bigweb');

$sql = "SELECT * FROM `users` WHERE `name`= '$username' ";
$res = mysqli_query($link,$sql);
$row = mysqli_fetch_assoc($res);
if(!$row){
  $arr = ['status'=>0,"msg"=>"用户名不存在"];
  
}else{
  if($row['password'] !== $password){
    $arr = ['status'=>0,"msg"=>"密码错误"];
  }else{
    $arr = ['status'=>1,"msg"=>"登录成功",'name'=>$username];
  }
}
echo json_encode($arr);