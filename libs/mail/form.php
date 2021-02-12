<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->isSMTP();
$mail->Host = 'smtp.sendgrid.net';
$mail->SMTPAuth = true;
$mail->Username = '';
$mail->Password = '';
$mail->Port = 587;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

// От кого письмо
$mail->setFrom('info@forks-manual.ru', 'Букмекерские вилки');
// Кому отправлять
$mail->addAddress('JordanBelfort111@yandex.ru'); // dexite@list.ru
// Тема письма
$mail->Subject = 'forks-manual.ru | Новая письмо';

// Тело письма
$body = 'forks-manual.ru | Новая письмо';

if (trim(!empty($_POST['name']))) {
    $body .= '<p><strong>Имя:</strong> ' . $_POST['name']. '</p>';
}
if (trim(!empty($_POST['email']))) {
    $body .= '<p><strong>Email:</strong> ' . $_POST['email']. '</p>';
}
if (trim(!empty($_POST['phone']))) {
    $body .= '<p><strong>Номер телефона:</strong> ' . $_POST['phone']. '</p>';
}
if (trim(!empty($_POST['skype']))) {
    $body .= '<p><strong>Логин Skype:</strong> ' . $_POST['skype']. '</p>';
}

$body .= '<small>Это письмо было создано автоматически. Не пытайтесь ответить на него.</small>';

$mail->Body = $body;

// Отправка на Email
if (!$mail->send()) {
    $message = $mail->ErrorInfo;
} else {
    $message = 'Вы успешно отправили заявку. Ожидайте ответа!';
}

// Отправка Telegram
$token = '1655802416:AAGlxP3RXxJfU55IOgrBVhHnqBLnGW69F_w';
$chat_id = '-1001401436170';

$telegram = Array(
    'Имя: ' => $_POST['name'],
    'Email: ' => $_POST['email'],
    'Номер телефона: ' => $_POST['phone'],
    'Логин Skype: ' => $_POST['skype']
);

$txt = '<b>Новая заявка с сайта</b>%0A';
foreach ($telegram as $key => $value) {
    $txt .= '<b>' . $key . '</b>' . $value . '%0A';
}

$url = "https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);

curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 0);
$curl_scraped_page = curl_exec($ch);
curl_close($ch);

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
return true;
