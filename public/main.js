document.addEventListener('DOMContentLoaded', function() {

    // inicialización de socket con namespace utilizado
    const socket = io('/envia_test');

    // obtención de elementos de DOM a manipular
    const counterDisplay = document.querySelector('#lbl_counter'); 
    const generateButton = document.querySelector('#btn_generate');
    const statusDisplay = document.querySelector('#lbl_status');

    // escucha por actualizaciones del contador desde el servidor
    socket.on('CURRENT_COUNTER', (data) => {
        // actualizar el contador en DOM
        counterDisplay.textContent = data;
    });

    // Cuando se hace clic en el botón, enviar una petición para generar una guía
    generateButton.addEventListener('click', function() {

        // se deshabilita el botón de generación de guía
        generateButton.style.display = "none";

        // muestra mensaje de carga en DOM
        statusDisplay.textContent = 'Generando guía...';
        statusDisplay.style.color = 'grey';

        // solicitud http para creación "label"
        fetch('/api/labels', { method: 'POST' })
            .then(response => response.json())
            .then((data) => {
                if(data.status === 'success') {
                    handleSuccess();
                }
                else {
                    handleError(data);
                }
            })
            .catch(error => {
                handleError(error);
            });
    });

    function handleSuccess() {

        // se deshabilita el botón de generación de guía
        generateButton.style.display = "block";

        // despliega mensaje de éxito en DOM
        statusDisplay.textContent = 'Guía generada exitosamente';
        statusDisplay.style.color = 'green';

        // reinicia mensaje en DOM
        setTimeout(() => {
            statusDisplay.textContent = '';
        }, 3000);
    }

    function handleError(error) {
        console.error('Error al generar la label:', error);
        // despliega mensaje de error en DOM
        statusDisplay.textContent = error.message ? error.message : 'Error al generar guía';
        statusDisplay.style.color = 'red';
    }

});
