    const btnEnviar = document.getElementById('btnEnviar');
        document.getElementById('form').addEventListener('submit', function (event) {
        event.preventDefault();

        let validos = 0;
        let idTimeout;
        let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let nombre = document.getElementById("nombre_id");
        let apellido = document.getElementById("apellido_id");
        let password = document.getElementById("password_id");
        let confirmPass = document.getElementById("password2_id");
        let gender = document.getElementById("sexo_id");
        let correo = document.getElementById("correo_id");
        let telefono = document.getElementById("telefono_id");
        let fecha = document.getElementById("fecha_id");
        let alertError = document.getElementById("alertError");
        let formulario = document.getElementById('form');
        let alertCorrecto = document.getElementById("alertCorrecto");


        alertError.style.display = "none" //Quitar mensaje de error
        alertError.innerHTML = "";

        function mostrarError(mensaje, elemento) {
            // Muestra un mensaje de error
            alertError.style.display = "block";
            alertError.innerHTML += mensaje;
            // Aplica un estilo de error al elemento del formulario
            elemento.style.border = "solid red 1px"
        }

        function validarCampo(campo, mensaje, regex) {
            if (campo.value == "") {
                mostrarError("<br>" + mensaje + " es obligatorio.", campo);
            } else if (!campo.value.match(regex)) {
                mostrarError("<br>" + mensaje + " no es válido.", campo);
            } else {
                campo.style.border = "solid green 1px";
                validos++;
            }
        }

        function validarFecha(fecha) {
            let fechaNacimiento = new Date(fecha.value);
            // Calcula la edad del usuario a partir de su fecha de nacimiento
            let hoy = new Date();
            let edad = Math.floor((hoy - fechaNacimiento) / 31536000000);
            // Si el usuario es menor de 18 años, muestra un mensaje de error
            if (edad < 18) {
                mostrarError("<br>Debes ser mayor de 18 años para registrarte.", fecha);
            } else {
                // Si el usuario es mayor de edad, aumenta el contador de campos válidos
                fecha.style.border = "solid green 1px";
                validos++;
            }
        }




        validarCampo(nombre, "El Nombre", /.{3,}/);
        validarCampo(apellido, "El Apellido", /.{3,}/);
        validarCampo(password, "La contraseña", /.{5,}/);
        validarCampo(correo, "El correo electrónico", emailRegex);
        validarCampo(telefono, "El teléfono", /[0-9]{10}/);

        if (gender.value == "Sexo") {
            mostrarError("<br>Selecciona tu género.", gender);
        } else {
            gender.style.border = "solid green 1px";
            validos++;
        }

        if (fecha.value == "") {
            mostrarError("<br>La fecha es obligatoria.", fecha);
        } else {
            validarFecha(fecha);
        }

        if ((idTimeout != undefined) && (idTimeout != null)) {
            clearTimeout(idTimeout);
        }//idTimeout

        if (validos == 7) {
            setTimeout(function () {
                nombre.style.border = "";
                apellido.style.border = "";
                password.style.border = "";
                confirmPass.style.border = "";
                gender.style.border = "";
                correo.style.border = "";
                telefono.style.border = "";
                fecha.style.border = "";
                alertCorrecto.innerHTML = "¡Tu registro se ha completado correctamente!";
                alertCorrecto.style.display = "block";

                formulario.reset();
            }, 2000);

        }

        let usuario = {
            nombre: nombre.value,
            apellido: apellido.value,
            password: password.value,
            genero: gender.value,
            correo: correo.value,
            telefono: telefono.value,
            fechaNacimiento: fecha.value
        };

        console.log(usuario);

        let usuarioJSON = JSON.stringify(usuario);

    });