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
	$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
	$mail->SMTPAuth = true;                               // Enable SMTP authentication
	$mail->Username = 'testforme876@gmail.com';                 // Наш логин
	$mail->Password = 'testforme12345';                           // Наш пароль от ящика
	$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
	$mail->Port = 465;   


	//От кого письмо
	$mail->setFrom('testforme876@gmail.com', 'Сайт "Покраска сооружений"');
	//Кому отправить
	$mail->addAddress('Rss196@mail.ru');
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