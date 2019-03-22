<?php

require './config.php';

$conn = new mysqli($servername, $username, $password, $dbname);

var_dump($_GET);exit();
$sql="SELECT DISTINCT gebied FROM ritten";