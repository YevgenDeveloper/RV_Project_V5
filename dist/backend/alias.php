<?php

require './config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
$user = $_GET['email'];
$aliasname = $_GET['aliasname'];

$sql="UPDATE users SET Alias = '".$aliasname."' WHERE username = '".$user."'";
$query = mysqli_query($conn, $sql);
var_dump($_GET);exit();