<?php

$servername = "localhost";
$username   = "pmauser";
$password   = "Beeuhpxccux8-";
$dbname     = "nes27_railview";

$conn = new mysqli($servername, $username, $password, $dbname);

$sql="SELECT DISTINCT gebied FROM ritten";

$query = mysqli_query($conn,$sql);

while ($row = mysqli_fetch_assoc($query))
{
    echo $row['gebied'];
}
