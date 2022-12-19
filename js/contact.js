const btnEnviar = document.getElementById('btnEnviar');
document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        btnEnviar.value = 'Enviando...';
        const serviceID = 'default_service';
        const templateID = 'template_5uzs5tm';
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btnEnviar.value = 'Enviar mensaje';
                alert('Mensaje enviado correctamente');
            }, (err) => {
                btnEnviar.value = 'Enviar mensaje';
                alert(JSON.stringify(err));
            });
    });