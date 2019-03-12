<?php

$url = $_GET['url'];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, 1);

$response = curl_exec($ch);

$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$headers = array_filter(explode("\r\n", substr($response, 0, $header_size)));
$body = substr($response, $header_size);

curl_close($ch);
foreach ($headers as $header) {
    header($header);
}

echo $body;