# pruebaDevBackend
Prueba tecnica

Instrucciones para compilar

1. Tener instalador NODE.JS
2. Instalar paquetes correspondientes ya que node_modules esta en gitignore
    2.1 Instalar express y morgan $ npm i express morgan
    2.2 Instalar xlsx $ npm i xlsx
    2.3 Instalar moment  $ npm i moment
    2.4 Instalar jest supertest  $ npm i -D jest supertest
    2.4 Instalar jest supertest  $ npm i -D jest supertest
3. Si se quiere utilizar un excel diferente sustituir el actual y debe llevar el mismo nombre 'query_result_2022.xlsx' ya que este esta hardcodeado. 
4. Arrancar el servidor de express $ npm run dev
5. Consumir api desde postman Por el metodo get ó post 'http://localhost:4000/api/consumos' pasandole en el body la siguiente estructura:
    {
        "date" :"2022-10-14",
        "period" : "weekly"
    }

5.1 Tambien se le debe pasar una key en el header de la petición Content-Type : application/json.
6 CURL:

curl --location --request POST 'http://localhost:4000/api/consumos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "date" :"2022-10-14",
    "period" : "weekly"
}'

CURL EN PHP

<?php
$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://localhost:4000/',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
    "date" :"2022-10-14",
    "period" : "weekly"
}',
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;

