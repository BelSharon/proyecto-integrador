const btnEnviar = document.getElementById('btnEnviar');
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    let validos = 0;
    let idTimeout;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const campos = ['nombre_id', 'apellido_id', 'password_id', 'password2_id', 'sexo_id', 'correo_id', 'telefono_id', 'fecha_id'];
    const camposObtenidos = {};
    campos.forEach(campo => camposObtenidos[campo] = document.getElementById(campo))

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




    validarCampo(camposObtenidos.nombre_id, "El Nombre", /.{3,}/);
    validarCampo(camposObtenidos.apellido_id, "El Apellido", /.{3,}/);
    validarCampo(camposObtenidos.password_id, "La contraseña", /.{1,}/);
    validarCampo(camposObtenidos.correo_id, "El correo electrónico", emailRegex);
    validarCampo(camposObtenidos.telefono_id, "El teléfono", /[0-9]{10}/);

    if (camposObtenidos.sexo_id.value == "Sexo") {
        mostrarError("<br>Selecciona tu género.", camposObtenidos.sexo_id);
    } else {
        camposObtenidos.sexo_id.style.border = "solid green 1px";
        validos++;
    }

    if (camposObtenidos.fecha_id.value == "") {
        mostrarError("<br>La fecha es obligatoria.", camposObtenidos.fecha_id);
    } else {
        validarFecha(camposObtenidos.fecha_id);
        
    }

    if (camposObtenidos.password_id.value !== camposObtenidos.password2_id.value) {
        mostrarError("<br>Las contraseñas no coinciden.", camposObtenidos.password_id);
      } else{
        validos++;
      }

    if ((idTimeout != undefined) && (idTimeout != null)) {
        clearTimeout(idTimeout);
    }//idTimeout

    

    let numCampos = campos.length;
    if (validos == numCampos) {
      setTimeout(function () {
        camposObtenidos.nombre_id.style.border = "";
        camposObtenidos.apellido_id.style.border = "";
        camposObtenidos.password_id.style.border = "";
        camposObtenidos.password2_id.style.border = "";
        camposObtenidos.sexo_id.style.border = "";
        camposObtenidos.correo_id.style.border = "";
        camposObtenidos.telefono_id.style.border = "";
        camposObtenidos.fecha_id.style.border = "";
        alertCorrecto.innerHTML = "¡Tu registro se ha completado correctamente!";
        alertCorrecto.style.display = "block";

        setTimeout(function(){
          alertCorrecto.style.display = "none";
      }, 2000);
      formulario.reset();
    }, 2000);
  }

    if (validos === numCampos) {
      let usuario = {
        nombre: camposObtenidos.nombre_id.value,
        apellido: camposObtenidos.apellido_id.value,
        password: camposObtenidos.password_id.value,
        genero: camposObtenidos.sexo_id.value,
        correo: camposObtenidos.correo_id.value,
        telefono: camposObtenidos.telefono_id.value,
        fechaNacimiento: camposObtenidos.fecha_id.value
      };
      console.log(usuario);
      let usuarioJSON = JSON.stringify(usuario);
    }

  });