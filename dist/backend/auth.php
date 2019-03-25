<?php

require './config.php';

$conn = new mysqli($servername, $username, $password, $dbname);

$email = $_GET['email'];
$loginpass = $_GET['password'];

$sql = "SELECT passwordhash FROM users WHERE username = '" . $email . "'";

$query = mysqli_query($conn, $sql);

$output = array();
while ($row = mysqli_fetch_assoc($query)) {
    array_push($output, $row['passwordhash']);
}
$currentpass = $output[0];

header('Content-Type: application/text');

if ($query->num_rows == 0) {
    echo "User does not exist";
} else {
    if ($loginpass == $currentpass) {
        echo 'valid';
    } else {
        echo 'Wrong password';
    }
}