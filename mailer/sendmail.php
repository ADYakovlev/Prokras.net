<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	use PHPMailer\PHPMailer\SMTP;

	require 'phpmailer/src/Exception.php';
	require 'phpmailer/src/PHPMailer.php';
	require 'phpmailer/src/SMTP.php';

	$mail = new PHPMailer(true);
	$mail->CharSet = 'UTF-8';
	$mail->setLanguage('ru', 'phpmailer/language/');
	$mail->IsHTML(true);



	$mail->isSMTP();                                      // Set mailer to use SMTP
	$mail->Host = 'smtp.beget.com';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'rss@skb.ru';                 // Наш логин
	$mail->Password = 'Rss123';                           // Наш пароль от ящика
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;   


	//От кого письмо
	$mail->setFrom('rss@skb.ru', 'Сайт "Покраска сооружений"');
	//Кому отправить
	$mail->addAddress('ay@skb.ru');
	//Тема письма
	$mail->Subject = 'Заявка с сайта';

	//Тело письма
	$body = '<h1>Данные:</h1>';
	
	if(trim(!empty($_POST['category_work']))){
		$body.='<p><strong>Виды работ:</strong> '.$_POST['category_work'].'</p>';
	}
	if(trim(!empty($_POST['work_size']))){
		$body.='<p><strong>Обьем работ:</strong> '.$_POST['work_size'].'</p>';
	}
	if(trim(!empty($_POST['date']))){
		$body.='<p><strong>Дата:</strong> '.$date.'</p>';
	}
	if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Номер телефона:</strong> '.$_POST['phone'].'</p>';
	}
	
	

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>
