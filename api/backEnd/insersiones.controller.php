<?php



    class Inserciones{
        private static $database;
        private static $respuesta;
        
        public function __construct(){
            self::$database = new DataBase();
            self::$respuesta = null;
        }

        public static function setUsuario($nombre, $email, $hora_registro, $etapa){
            try{
                
                $sql = "INSERT INTO datos_personales (nombre, email, hora_registro, etapa) values(:nombre, :email, :hora_registro, :etapa)";
                $db = self::$database::getConnection();
                $stmt = $db->prepare($sql);
                $stmt->bindParam(":nombre", $nombre);
                $stmt->bindParam(":email", $email);
                $stmt->bindParam(":hora_registro", $hora_registro);
                $stmt->bindParam(":etapa", $etapa);
                $stmt->execute();
                $lastInsertID = $db->lastInsertId();
                if($lastInsertID == 0){
                    throw new RuntimeException("Error al insertar el usuario");
                }else{
                    $respuestas = self::setRespuestaInicio($lastInsertID, $hora_registro);
                    if($respuestas["status"] != "ok"){
                        throw new RuntimeException("Error al insertar la respuesta de inicio: " . $respuestas["mensaje"]);
                    }else{
                        self::$respuesta['last_insert_id_respuesta'] = $respuestas["id"];
                        self::$respuesta["status"] = "ok";
                        self::$respuesta["mensaje"] = "Registro Exitoso";
                        self::$respuesta["last_insert_id_client"] = $lastInsertID;
                    }
                }
                
            } catch (RuntimeException $e) {
                self::$respuesta["status"] = "error";
                self::$respuesta["mensaje"] = $e->getMessage();
            }catch(PDOException $e){
                self::$respuesta["status"] = "error";
                self::$respuesta["mensaje"] = $e->getMessage();
            }
            return self::$respuesta;
            
        }

        public static function setRespuestaInicio($id, $fecha_actual){
            try{
                $sql = "INSERT INTO respuestas (id_datos_personales, fecha_inicio) VALUES (:id_datos_personales, :fecha_inicio)";
                $db = self::$database::getConnection();
                $stmt = $db->prepare($sql);
                $stmt->bindParam(":id_datos_personales", $id);
                $stmt->bindParam(":fecha_inicio", $fecha_actual);
                $stmt->execute();
                $lastInsertID = $db->lastInsertId();
                
                self::$respuesta["status"] = "ok";
                self::$respuesta["mensaje"] = "Registro Exitoso";
                self::$respuesta["id"] = $lastInsertID;
                self::$respuesta["fechaInicio"] = $fecha_actual;

            }catch(PDOException $e){
                self::$respuesta["status"] = "error";
                self::$respuesta["mensaje"] = $e->getMessage();
            }
            return self::$respuesta;
        }
        

        public static function setRespuesta($idCliente, $id, $respuesta, $tipoRes){
            try{
                $sql = '';
                if($tipoRes == 1){
                    $sql = "UPDATE respuestas SET respuesta1 = :respuesta1  where id = :id";
                }

                if($tipoRes == 2){
                    $sql = "UPDATE respuestas SET respuesta2 = :respuesta2  where id = :id";

                }

                if($tipoRes == 3){
                    
                    $sql = "UPDATE respuestas SET respuesta3 = :respuesta3, fecha_fin = :fecha_fin where id = :id";

                }
                $db = self::$database::getConnection();
                $stmt = $db->prepare($sql);
                if($tipoRes == 1){
                    $stmt->bindParam(":respuesta1", $respuesta);
                }

                if($tipoRes == 2){
                    $stmt->bindParam(":respuesta2", $respuesta);
                }

                if($tipoRes == 3){
                    $fechaFin =  date("Y-m-d H:i:s");
                    $stmt->bindParam(":respuesta3", $respuesta);
                    $stmt->bindParam(":fecha_fin", $fechaFin);
                }

                $stmt->bindParam(":id", $id);
                $stmt->execute();
                
                self::updateUsuario($idCliente, $tipoRes);

                self::$respuesta["status"] = "ok";
                self::$respuesta["mensaje"] = "Registro Exitoso";
            }catch(PDOException $e){
                self::$respuesta["status"] = "error";
                self::$respuesta["mensaje"] = $e->getMessage();
            }
            return self::$respuesta;
        }

        public static function updateUsuario($id, $etapa){
            try{
                $sql = "UPDATE datos_personales SET etapa = :etapa where id = :id";
                $db = self::$database::getConnection();
                $stmt = $db->prepare($sql);
                $stmt->bindParam(":etapa", $etapa);
                $stmt->bindParam(":id", $id);
                $stmt->execute();
                self::$respuesta["status"] = "ok";
                self::$respuesta["mensaje"] = "Exitoso";
            }catch(PDOException $e){
                self::$respuesta["status"] = "error";
                self::$respuesta["mensaje"] = $e->getMessage();
            }
            return self::$respuesta;
        }
        

    }