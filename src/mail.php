<?php 

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$email = $_POST['email'];
// $message = "Заявка с сайта";

// $subject = "=?utf-8?B?".base64_encode("Сообщение с сайта")."?=";
// $headers = "From: $email\r\nReplay-to: $email\r\nContent-type: text/html; charset=utf-8\r\n";
// $success = mail("pkp1992-92@mail.ru", $subject, $message, $headers);
// if($success){
//     echo var_dump($_POST);
// }



$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'mailer.php92@mail.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = '@U3#6gt^nMwz0c0&FRdA'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('mailer.php92@mail.ru'); // от кого будет уходить письмо?
$mail->addAddress('pkp1992-92@mail.ru');     // Кому будет уходить письмо 
// $mail->addAddress('ellen@example.com');               // Name is optional
// $mail->addReplyTo('info@example.com', 'Information');
// $mail->addCC('cc@example.com');
// $mail->addBCC('bcc@example.com');
// $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
// $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
// $mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с тестового сайта';
$mail->Body    = '' .$name . ' оставил заявку ' . '<br>Почта этого пользователя: ' .$email;
$mail->AltBody = '';

if(!$mail->send()) {
    var_dump($_POST);
} else {
           echo ('OK');
        }
        
        
        
        
//         $token = "805732454:AAEY4O4EkGlVWyvUTsEtIycWtNvEMk9__vU";
//         $chat_id = "-154763806";
//         $arr = array(
//             'Имя пользователя: ' => $name,
//             'Email' => $email
//         );
        
//         foreach($arr as $key => $value) {
//             $txt = "<b>".$key."</b> ".$value."%0A";
//         };
        
//         $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
        
//         if ($sendToTelegram) {
//             var_dump($_POST);
//         } else {
//             echo "Error";
// }

?>