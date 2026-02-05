<?php
// Configuración de correo
$destinatario = "contacto@grupoyoma.com.mx";
$asunto = "Nueva respuesta de Encuesta de Satisfacción";

// Construcción del mensaje en HTML
$mensaje  = "<html><body>";
$mensaje .= "<h2>Nueva respuesta de Encuesta de Satisfacción</h2>";
$mensaje .= "<table border='1' cellpadding='6' cellspacing='0' style='border-collapse:collapse; font-family:Arial, sans-serif;'>";

$mensaje .= "<tr><th>Empresa</th><td>" . $_POST['empresa'] . "</td></tr>";
$mensaje .= "<tr><th>Respondente</th><td>" . $_POST['respondente'] . "</td></tr>";
$mensaje .= "<tr><th>Fecha</th><td>" . $_POST['fecha'] . "</td></tr>";

if (isset($_POST['calidad_productos'])) {
    $mensaje .= "<tr><th>1. Calidad de productos</th><td>" . $_POST['calidad_productos'] . "</td></tr>";
}

if (isset($_POST['expectativas'])) {
    $mensaje .= "<tr><th>2. Cumple expectativas</th><td>" . $_POST['expectativas'] . "</td></tr>";
}

if (isset($_POST['calidad_general'])) {
    $mensaje .= "<tr><th>3. Calidad general</th><td>" . $_POST['calidad_general'] . "</td></tr>";
}

if (isset($_POST['ventas'])) {
    $mensaje .= "<tr><th>4. Atención Ventas</th><td>" . $_POST['ventas'] . "</td></tr>";
}
if (isset($_POST['transporte'])) {
    $mensaje .= "<tr><th>4. Atención Transporte/Operador</th><td>" . $_POST['transporte'] . "</td></tr>";
}
if (isset($_POST['credito'])) {
    $mensaje .= "<tr><th>4. Atención Crédito y Cobranza</th><td>" . $_POST['credito'] . "</td></tr>";
}

if (isset($_POST['entrega'])) {
    $mensaje .= "<tr><th>5. Tiempo de entrega</th><td>" . $_POST['entrega'] . "</td></tr>";
}

if (isset($_POST['calidad_servicio'])) {
    $mensaje .= "<tr><th>6. Calidad del servicio</th><td>" . $_POST['calidad_servicio'] . "</td></tr>";
}

if (isset($_POST['recomendar'])) {
    $mensaje .= "<tr><th>7. Probabilidad de recomendar</th><td>" . $_POST['recomendar'] . "</td></tr>";
}

$mensaje .= "<tr><th>Fortalezas</th><td>" . nl2br($_POST['fortalezas']) . "</td></tr>";
$mensaje .= "<tr><th>Debilidades</th><td>" . nl2br($_POST['debilidades']) . "</td></tr>";

$mensaje .= "</table>";
$mensaje .= "</body></html>";

// Cabeceras del correo para HTML
$cabeceras  = "MIME-Version: 1.0\r\n";
$cabeceras .= "Content-type: text/html; charset=UTF-8\r\n";
$cabeceras .= "From: encuesta@grupoyoma.com.mx\r\n";
$cabeceras .= "Reply-To: encuesta@grupoyoma.com.mx\r\n";
$cabeceras .= "X-Mailer: PHP/" . phpversion();

// Envío
if (mail($destinatario, $asunto, $mensaje, $cabeceras)) {
    header("Location: gracias.html");
    exit;
} else {
    echo "Hubo un error al enviar la encuesta.";
}
?>
