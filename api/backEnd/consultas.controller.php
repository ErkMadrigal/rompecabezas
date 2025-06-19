<?php 

     class Consultas{
        private static $database;
        private static $respuesta;
        
        public function __construct(){
            self::$database = new DataBase();
            self::$respuesta = null;
        }
        
        public static function prueba(){
            self::$respuesta["status"] = "ok";
            self::$respuesta["mensaje"] = "La API esta funcionando correctamente";
            self::$respuesta["timestamp"] = date("Y-m-d H:i:s");
            self::$respuesta["version"] = "1.0.0";
            return self::$respuesta;

        }


        public static function getUsr($id){
            try{
                $sql = "SELECT * FROM datos_personales WHERE id = :id";
                
                $dbc = self::$database::getConnection();
                $stmt = $dbc->prepare($sql);
                $stmt->bindParam(":id", $id);
                $stmt->execute();
                $data = $stmt->fetch(PDO::FETCH_ASSOC);  
                self::$respuesta["status"] = "ok";
                self::$respuesta["data"] = $data;
            }catch(PDOException $e){
                self::$respuesta["status"] = "error";
                self::$respuesta["data"] = [];
                self::$respuesta["mensaje"] = $e->getMessage();
            }
            return self::$respuesta;
        }


        public static function getEtapa($id){
            try{
                $sql = "SELECT etapa FROM datos_personales WHERE id = :id";
                
                $dbc = self::$database::getConnection();
                $stmt = $dbc->prepare($sql);
                $stmt->bindParam(":id", $id);
                $stmt->execute();
                $data = $stmt->fetch(PDO::FETCH_ASSOC);  
                self::$respuesta["status"] = "ok";
                self::$respuesta["data"] = $data;
            }catch(PDOException $e){
                self::$respuesta["status"] = "error";
                self::$respuesta["data"] = [];
                self::$respuesta["mensaje"] = $e->getMessage();
            }
            return self::$respuesta;
        }


        
    }
    