# ENVIA TEST

Solución a prueba técnica en la cual se hace uso de la API proporcionada "https://api-test.envia.com" la cual hace uso del ambiente de pruebas.
Mediante interfáz gráfica se consulta la cantidad de Guías generadas en base a contador almacenado en base de datos local, al generar nuevas guías este contador se actualiza para todos los usuarios conectados desplegando el nuevo valor del contador en pantalla.

Tecnologías/librerías empleadas:
* Node.js ^18.0
* Socket.io ^4.7.4
* MySQL ^8.0
* Axios ^1.6.7
* Cors ^2.8.5
* Express ^4.18.2
* mysql2 ^3.9.1
* Sequelize ^6.36.0

## Instalación
1. Clonar repositorio a ambiente local
2. Creación de cuenta en y generación de Token para conexión en sitio "https://shipping-test.envia.com"
3. Dentro de directorio local instalación de aplicación:
```bash
npm install
```
4. Creación de base de datos en MySQL con nombre deseado.
5. Configuración de archivo .env en raíz de proyecto (mismo nivel que archivo "index.js") remplazando valores de conexión a base de datos
```bash
DB_USERNAME=usuario_de_base_de_datos
DB_PASSWORD=contraseña_de_base_de_datos
DB_NAME=nombre_de_base_de_datos
DB_HOST=localhost
DB_TYPE=mysql
DB_PORT=puerto_de_base_de_datos
```
6. Configuración de Puerto y token obtenido en archivo .env
```bash
PORT=puerto_disponible
API_TOKEN=token_obtenido
```
7. Ejecutar aplicación
```bash
npm start
```
8. Ingresar mediante el navegador a aplicación para comenzar la creación de guías.
```bash
http://localhost:<puerto_configurado>/index.html
```


