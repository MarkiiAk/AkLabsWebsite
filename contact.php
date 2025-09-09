<?php
// ==================================================
// AK Labs — contact.php
// Recibe POST desde el formulario y envía email
// ==================================================

// Configuración
$to      = "tu-correo@tudominio.com"; // <-- cambia esto a tu correo
$subject = "Nueva cotización desde AK Labs";

// Sanitizar campos
$name    = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : "";
$email   = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : "";
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : "";
$honey   = isset($_POST['website']) ? $_POST['website'] : ""; // honeypot anti-bots

// Validación básica
if ($honey !== "" || empty($name) || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($message) < 10) {
    http_response_code(400);
    echo "Error en los datos del formulario.";
    exit;
}

// Construir cuerpo del correo
$body = "Has recibido una nueva cotización desde el sitio web AK Labs.\n\n";
$body .= "Nombre: $name\n";
$body .= "Email: $email\n";
$body .= "Mensaje:\n$message\n";

// Headers
$headers  = "From: AK Labs <no-reply@tudominio.com>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Enviar
if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo "Cotización enviada correctamente.";
} else {
    http_response_code(500);
    echo "Hubo un error al enviar el mensaje.";
}
?>
