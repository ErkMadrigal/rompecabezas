<?php 
require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');

$dotenv->load();

class DataBase {
    private static $host;
    private static $user;
    private static $password;
    private static $name;

    public static function getConnection() {
        // Asignamos desde el .env
        self::$host = $_ENV['DB_HOST'];
        self::$user = $_ENV['DB_USER'];
        self::$password = $_ENV['DB_PASSWORD'];
        self::$name = $_ENV['DB_NAME'];

        try {
            $dsn = "mysql:host=" . self::$host . ";dbname=" . self::$name;
            $dbc = new PDO($dsn, self::$user, self::$password);
            $dbc->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $dbc;
        } catch (PDOException $e) {
            echo "Error de conexión: " . $e->getMessage();
            return null;
        }
    }
}