const btnEnviar = document.getElementById('btnEnviar');
document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        //btnEnviar.value = 'Enviando...';
        const serviceID = 'default_service';
        const templateID = 'template_wp16ogc';
        emailjs.sendForm(serviceID, templateID, this);
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
       
        function mostrarError(mensaje1, campo, idError) {
            const errorElement = document.getElementById(idError);
            if (errorElement) {
                errorElement.style.display = "block";
                errorElement.innerHTML = mensaje1;
                campo.style.border = "solid red 1px";
            } else {
                console.error(`No existe elemento con id: ${idError}`);
            }
        }
       
       
       
       
       
       
       
        if (mensaje.value.trim().replaceAll("", "").length < 20) {
            mostrarError("El mensaje debe tener al menos 20 caracteres", mensaje, "error_mensaje_id");
            mensaje.focus();
            mensaje.select();
            mensaje.style.border = "solid red 1px" // color rojo al no estar correcto
        } else {
            document.getElementById("error_mensaje_id").style.display = "none";
            mensaje.style.border = "solid green 1px" // color verde al  estar correcto
            validos++;
        }
        if (nombre.value.length<3) {
            mostrarError("El nombre no es válido", nombre, "error_nombre_id");
            nombre.style.border="solid red 1px"
        }else{
            document.getElementById("error_nombre_id").style.display = "none";
            nombre.style.border="solid green 1px"
            validos++;
        }
        if (correo.value.match(emailRegex)==null) {
            mostrarError("El correo electrónico no es válido.", correo, "error_email_id");
            correo.style.border="solid red 1px"
        }else{
            document.getElementById("error_email_id").style.display = "none";
            correo.style.border="solid green 1px"
            validos++;
        }        

        let numRegex = /^([1-9])\d{9}$/;
        if (telefono.value.match(numRegex) == null) {
            
            mostrarError("El teléfono no es válido.", telefono, "error_telefono_id");
            telefono.style.border = "solid red 1px"
        } else {
            document.getElementById("error_telefono_id").style.display = "none";
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