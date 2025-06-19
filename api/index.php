<?php
require 'vendor/autoload.php';

require_once './backEnd/db.php';
require_once './backEnd/consultas.controller.php';
require_once './backEnd/insersiones.controller.php';

// Configuración de CORS y cabeceras JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Ahora permitimos GET y POST
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

date_default_timezone_set('America/Mexico_City');

// Manejo de preflight OPTIONS (CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// --- Procesamos la opción según el método HTTP ---
$opcion = '';
$data = [];

// Caso especial para GET (pruebaVida)
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $opcion = $_GET['opcion'] ?? 'pruebaVida';
    
    // Solo permitimos 'pruebaVida' en GET
    if ($opcion !== 'pruebaVida') {
        http_response_code(405);
        echo json_encode(["status" => "error", "message" => "Método GET solo soporta pruebaVida"]);
        exit();
    }
} 
// Para POST (todas las demás operaciones)
elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    
    // Validamos el JSON
    if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "JSON inválido"]);
        exit();
    }
    
    $opcion = $data['opcion'] ?? '';
} 
// Rechazamos otros métodos
else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
    exit();
}

// --- Ejecutamos la lógica según la opción ---
$inserciones = new Inserciones();
$consultas = new Consultas();

switch ($opcion) {
    case "pruebaVida":
        $db = DataBase::getConnection();
        if ($db) {
            echo json_encode([
                "status" => "ok",
                "message" => "Conexión exitosa",
                "data" => $consultas::prueba(),
                "conection" => true,
            ], JSON_UNESCAPED_UNICODE);
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error de conexión a la base de datos",
                "data" => null,
                "conection" => false,
            ], JSON_UNESCAPED_UNICODE);
        }
        break;

    case "usuarios":
        $fecha_actual = date("Y-m-d H:i:s");
        if(!$data['aviso'] || !$data['terminos']){
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Es requerido aceptar los terminos y condiciones y el aviso de privacidad"]);
            break;   
        }
        if (empty($data['nombre']) || empty($data['email'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Datos incompletos"]);
            break;
        }else{
            echo json_encode(
                $inserciones::setUsuario($data['nombre'], $data['email'], $fecha_actual, etapa: 0)
            );
        }
        break;

    case "asignarRespuesta":
        if (empty($data['idCliente']) || empty($data['respuesta'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "ID de cliente y respuesta son requeridos"]);
            break;
        }else {
            echo json_encode(
                $inserciones::setRespuesta($data['idCliente'], $data['idRespuesta'], $data['respuesta'], $data['tipoRespuesta'])
            );
        }
        break;

    case "getEtapa":
        if (empty($data['idCliente'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "ID de cliente es requerido"]);
            break;
        } else {
            echo json_encode(
                $consultas::getEtapa($data['idCliente'])
            );
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Opción no válida"]);
        break;
}