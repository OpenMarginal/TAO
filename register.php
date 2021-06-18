<?php
$username = isset($_GET['name'])?$_GET['name']:'';
$email = isset($_GET['email'])?$_GET['email']:'';
$password = isset($_GET['password'])?$_GET['password']:'';

$link = mysqli_connect('127.0.0.1','root','root','bigweb');
// if($username){
//   $sql = "SELECT * FROM `users` WHERE `name`= '$username' ";
  
//   $res = mysqli_query($link,$sql);
//   $row = mysqli_fetch_assoc($res);
//   if($row){
//     echo '2';
//   }else{
//     echo "0";
//   }
//   die;
// }
// if($email){
//   $sql = "SELECT * FROM `users` WHERE `email`= '$email' ";
//   $res = mysqli_query($link,$sql);
//   $row = mysqli_fetch_assoc($res);
//   if($row){
//     echo '2';
//   }else{
//     echo "0";
//   }
//   die;
// }
if(!$email){
  $sql = "SELECT * FROM `users` WHERE `name`= '$username' ";
  
  $res = mysqli_query($link,$sql);
  $row = mysqli_fetch_assoc($res);
  if($row){
    echo '1';
  }else{
    echo "0";
  }
}else if(!$username){
  $sql = "SELECT * FROM `users` WHERE `email`= '$email' ";
  $res = mysqli_query($link,$sql);
  $row = mysqli_fetch_assoc($res);
  if($row){
    echo '1';
  }else{
    echo "0";
  }
}else {
  $sql = "SELECT * FROM `users` WHERE `email`= '$email' ";
  $res = mysqli_query($link,$sql);
  $row = mysqli_fetch_assoc($res);
  if($row){
    echo '2';
    die;
  }
  $sql1 = "SELECT * FROM `users` WHERE `name`= '$username' ";
  
  $res1 = mysqli_query($link,$sql1);
  $row1 = mysqli_fetch_assoc($res1);
  if($row1){
    echo '2';
    die;
  }
  
  
  $sql3 = "INSERT INTO `users` (`name`,`email`,`password`) VALUE('$username','$email','$password') ";
  
  $res3 = mysqli_query($link,$sql3);
  if($res3){
    echo '1';
  }else{
    echo "0";
  }
}









