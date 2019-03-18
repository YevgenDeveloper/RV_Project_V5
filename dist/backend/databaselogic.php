<?php

$servername = "localhost";
$username   = "pmauser";
$password   = "Beeuhpxccux8-";
$dbname     = "nes27_railview";

$conn = new mysqli($servername, $username, $password, $dbname);

$sql="SELECT DISTINCT gebied FROM ritten";

$query = mysqli_query($conn,$sql);
$output = array();
while ($row = mysqli_fetch_assoc($query))
{
    array_push($output, $row['gebied']);
}
header('Content-Type: application/json');
echo json_encode($output);