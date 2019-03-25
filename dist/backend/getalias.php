<?php

require './config.php';

$conn = new mysqli($servername, $username, $password, $dbname);

$sql="SELECT DISTINCT Alias FROM users WHERE Alias IS NOT NULL AND Alias != ''";

$query = mysqli_query($conn,$sql);
$output = array();
while ($row = mysqli_fetch_assoc($query))
{
    array_push($output, $row['Alias']);
}
header('Content-Type: application/json');

echo json_encode($output);