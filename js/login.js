const btnEnviar = document.getElementById('btnEnviar');
document.getElementById('formTest')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        let validos = 0;
        let idTimeout;
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let regexContrasena = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
        let nombre = document.getElementById("nombre_id");
        let contraseña = document.getElementById("contraseña_id");
        let alertError = document.getElementById("alertError");

        alertError.style.display = "none" //Quitar mensaje de error
        alertError.innerHTML = "";

        if (nombre.value.match(emailRegex)==null) {
            alertError.style.display="block";
            alertError.innerHTML += "<br>El correo electrónico no es válido.";
            correo.style.border="solid red 1px"
        }else{
            correo.style.border="solid green 1px"
            validos++;
        }        


    });