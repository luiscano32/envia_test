# ENVIA TEST

Solución a prueba técnica en la cual se hace uso de la API proporcionada "https://api-test.envia.com" la cual hace uso del ambiente de pruebas.
Mediante interfáz gráfica se consulta la cantidad de Guías generadas y se generan nuevas guías actualizando el contador para todos los usuarios conectados.

Tecnologías empleadas:
* Node.js
* Socket.io
* MySQL

## Instalación
1. Clonar repositorio a ambiente local
2. Creación de cuenta en y generación de Token para conexión en sitio "https://shipping-test.envia.com"
3. Dentro de directorio local instalación de aplicación:
```bash
npm install
```
3. Creación de base de datos en MySQL llamada "envia_test"
4. Configuración de archivo .env en raíz de proyecto remplazando valores de conexión a base de datos
```bash
DB_USERNAME=usuario_de_base_de_datos
DB_PASSWORD=contraseña_de_base_de_datos
DB_NAME=nombre_de_base_de_datos
DB_HOST=localhost
DB_TYPE=mysql
DB_PORT=puerto_de_base_de_datos
```
5. Configuración de Puerto y token obtenido en archivo .env
```bash
PORT=puerto_disponible
API_TOKEN=token_obtenido
```
6. Ejecutar aplicación
```bash
npm start
```
7. Ingresar mediante el navegador a aplicación para comenzar la creación de guías.
```bash
http://localhost:<puerto>/index.html
```

### Prerrequisitos
* Node.js versión 18 o superior

