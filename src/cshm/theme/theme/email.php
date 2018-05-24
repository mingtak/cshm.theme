<?php
/*	Your settings: */
$your_email_address = 'your email goes here...';
//$your_subject = 'Email from "Dotted PSD Tempalte" contact form';

header('ContentType: text/xml');
echo '<?xml version="1.0" encoding="UTF8" standalone="yes"?>';
echo '<response>';

$sender_name = strip_tags($_GET['name']);
$sender_email = strip_tags ($_GET['email']);
$sender_subject = strip_tags($_GET['subject']);
$sender_message = strip_tags($_GET['message']);

// Sent email
$headers   = array();
$headers[] = "MIME-Version: 1.0";
$headers[] = 'Content-type: text/html; charset=utf-8';
$headers[] = "From: $sender_name <$sender_email>";
$headers[] = "Reply-To: $sender_name <$sender_email>";
$headers[] = "Subject: {$sender_subject}";
$headers[] = "X-Mailer: PHP/".phpversion();

if (mail($your_email_address, $sender_subject, $sender_message, implode("\r\n", $headers))) {
	echo 'Email sent successfully!';
}

echo '</response>';
?>