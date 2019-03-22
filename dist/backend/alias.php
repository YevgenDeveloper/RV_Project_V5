<?php

require './config.php';

$conn = new mysqli($servername, $username, $password, $dbname);

$sql="SELECT DISTINCT gebied FROM ritten";