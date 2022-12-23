const btnEnviar = document.getElementById('btnEnviar');
document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        //btnEnviar.value = 'Enviando...';
        const serviceID = 'default_service';
        const templateID = 'template_wp16ogc';
        emailjs.sendForm(serviceID, templateID, this)
        let validos = 0;
        let idTimeout;
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let nombre = document.getElementById("nombre_id");
        let correo = document.getElementById("email_id");
        let telefono = document.getElementById("telefono_id");
        let mensaje = document.getElementById("mensaje_id");
        let alertError = document.getElementById("alertError");
        let formulario = document.getElementById('form');
        let alertCorrecto = document.getElementById("alertCorrecto");

        mensaje.value = mensaje.value.trim();
        alertError.style.display = "none" //Quitar mensaje de error
        alertError.innerHTML = "";
        if (mensaje.value.trim().replaceAll("", "").length < 20) {
            alertError.innerHTML = "El mensaje debe contener 20 caracteres o más"
            alertError.style.display = "block";
            mensaje.focus();
            mensaje.select();
            mensaje.style.border = "solid red 1px" // color rojo al no estar correcto
        } else {
            mensaje.style.border = "solid green 1px" // color verde al  estar correcto
            validos++;
        }
        if (nombre.value.length<3) {
            alertError.style.display="block";
            alertError.innerHTML += "<br>El Nombre no es válido.";
            nombre.style.border="solid red 1px"
        }else{
            nombre.style.border="solid green 1px"
            validos++;
        }
        if (correo.value.match(emailRegex)==null) {
            alertError.style.display="block";
            alertError.innerHTML += "<br>El correo electónivo no es válido.";
            correo.style.border="solid red 1px"
        }else{
            correo.style.border="solid green 1px"
            validos++;
        }        

        let numRegex = /[0-9]{10}/;
        if (telefono.value.match(numRegex) == null) {
            alertError.style.display = "block";
            alertError.innerHTML += "<br>El teléfono no es valido.";
            telefono.style.border = "solid red 1px"
        } else {
            telefono.style.border = "solid green 1px"
            validos++;
        }

        if ((idTimeout != undefined) && (idTimeout != null)) {
            clearTimeout(idTimeout);
        }//idTimeout

        if (validos == 4) {
            setTimeout(function () {
                nombre.style.border = "";
                correo.style.border = "";
                telefono.style.border = "";
                mensaje.style.border = "";
                alertCorrecto.innerHTML = "¡Tu mensaje se ha enviado correctamente!";
                alertCorrecto.style.display = "block";
                formulario.reset();
            }, 2000);
        }
    });
            // .then(() => {
            //     btnEnviar.value = 'Enviar mensaje';
            //     alert('Mensaje enviado correctamente');
            // }, (err) => {
            //     btnEnviar.value = 'Enviar mensaje';
            //     alert(JSON.stringify(err));
            // });