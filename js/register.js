arrayUsuarios = [];
const btnEnviar = document.getElementById('btnEnviar');
document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();

    let validos = 0;
    let idTimeout;
    let regexName =  /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g ;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let regexTel = /^([1-9])\d{9}$/;




    const campos = ['nombre_id', 'apellido_id', 'password_id', 'password_id2', 'sexo_id', 'correo_id', 'telefono_id', 'fecha_id'];
    const camposObtenidos = {};
    campos.forEach(campo => camposObtenidos[campo] = document.getElementById(campo))

    let alertError = document.getElementById("alertError");
    let formulario = document.getElementById('form');
    let alertCorrecto = document.getElementById("alertCorrecto");


    alertError.style.display = "none" //Quitar mensaje de error
    alertError.innerHTML = "";

    function mostrarError(mensaje, campo, idError) {
        const errorElement = document.getElementById(idError);
        if (errorElement) {
            errorElement.style.display = "block";
            errorElement.innerHTML = mensaje;
            campo.style.border = "solid red 1px";
        } else {
            console.error(`No existe elemento con id: ${idError}`);
        }
    }


    function validarNombre(campo, idError) {
      if (campo.value == "") {
          mostrarError("Este campo es obligatorio", campo, idError);
      } else if (campo.id === "nombre_id" && !campo.value.match(regexName)) {
          mostrarError("El nombre solo debe contener letras", campo, idError);
      } else if(campo.id === "nombre_id" && !campo.value.match(/.{3,20}/)){
          mostrarError("El nombre debe contener entre 3 y 20 caracteres", campo, idError);
      }else{
          campo.style.border = "solid green 1px";
          document.getElementById(idError).style.display = "none";
          validos++;
      }
  }

  function validarApellido(campo, idError) {
    if (campo.value == "") {
        mostrarError("Este campo es obligatorio", campo, idError);
    } else if (campo.id === "apellido_id" && !campo.value.match(regexName)) {
        mostrarError("El apellido solo debe contener letras", campo, idError);
    } else if(campo.id === "apellido_id" && !campo.value.match(/.{3,20}/)){
        mostrarError("El apellido debe contener entre 3 y 20 caracteres", campo, idError);
    }else{
        campo.style.border = "solid green 1px";
        document.getElementById(idError).style.display = "none";
        validos++;
    }
}

    function validarPass(campo, idError) {
        if (campo.value == "") {
            mostrarError("Este campo es obligatorio", campo, idError);
        } else if (campo.id === "password_id" && !campo.value.match(/.{8,20}/)) {
            mostrarError("La contraseña debe tener entre 8 y 20 caracteres", campo, idError);
        } else if (campo.id === "password_id" && !campo.value.match(/[0-9]/)) {
            mostrarError("La contraseña debe incluir al menos un número", campo, idError);
        } else if (campo.id === "password_id" && !campo.value.match(/[A-Z]/)) {
            mostrarError("La contraseña debe incluir al menos una mayúscula", campo, idError);
        } else if (campo.id === "password_id" && !campo.value.match(/[a-z]/)) {
            mostrarError("La contraseña debe incluir al menos una minúscula", campo, idError);
        } else if (campo.id === "password_id" && !campo.value.match(/[!@#$%^&*]/)) {
            mostrarError("La contraseña debe incluir al menos un caracter especial (!@#$%^&)", campo, idError);
        } else {
            campo.style.border = "solid green 1px";
            document.getElementById(idError).style.display = "none";
            validos++;
        }
    }

    function validarPasswordCoincide(password, password_confirm, idError) {
      if (password.value == "" || password_confirm.value == "") {
          mostrarError("Ambos campos de contraseña son obligatorios", password_confirm, idError);
      } else if(password.value !== password_confirm.value){
          mostrarError("Las contraseñas no coinciden", password_confirm, idError);
      }else{
          document.getElementById(idError).style.display = "none";
          password_confirm.style.border = "solid green 1px";
          validos++;
      }
  }
  

    function validarCorreo(campo, idError) {
        if (campo.value == "") {
          mostrarError("Este campo es obligatorio", campo, idError);
        } else if (campo.id === "correo_id" && !campo.value.match(emailRegex)) {
            mostrarError("Ingresa un correo electrónico valido", campo, idError);
        } else {
          campo.style.border = "solid green 1px";
          document.getElementById(idError).style.display = "none";
          validos++;
        }
      }

      function validarFecha(campo, idError) {
        if (campo.value == "") {
            mostrarError("Este campo es obligatorio", campo, idError);
          campo.style.border = "solid red 1px";
        } else if(isNaN(Date.parse(campo.value))) {
          document.getElementById(idError).style.display = "block";
          campo.style.border = "solid red 1px";
        }else {
          let fechaNacimiento = new Date(campo.value);
          let hoy = new Date();
          let edad = Math.floor((hoy - fechaNacimiento) / 31536000000);
          if (edad < 18) {
            mostrarError("Debe ser mayor de edad", campo, idError);
            campo.style.border = "solid red 1px";
          } else {
            document.getElementById(idError).style.display = "none";
            campo.style.border = "solid green 1px";
            validos++;
          }
        }
      }


      function validarGender(campo, idError) {
        if (campo.value == "Sexo") {
          mostrarError("Este campo es obligatorio", campo, idError);
        } else {
          campo.style.border = "solid green 1px";
          document.getElementById(idError).style.display = "none";
          validos++;
        }
      }
      
    
    

    function validarTelefono(campo, idError) {
        if (campo.value == "") {
          mostrarError("Este campo es obligatorio", campo, idError);
        } else if (campo.id === "telefono_id" && !campo.value.match(regexTel)) {
            mostrarError("Por favor introduce un teléfono válido (1x-xxxx-xxxx)", campo, idError);
        } else {
          campo.style.border = "solid green 1px";
          document.getElementById(idError).style.display = "none";
          validos++;
        }
      }




    validarNombre(camposObtenidos.nombre_id, "error_nombre_id");
    validarApellido(camposObtenidos.apellido_id, "error_apellido_id");
    validarPass(camposObtenidos.password_id, "error_password_id");
    validarCorreo(camposObtenidos.correo_id,"error_correo_id");
    validarTelefono(camposObtenidos.telefono_id, "error_telefono_id");
    validarFecha(camposObtenidos.fecha_id,"error_fecha_id");
    validarGender(camposObtenidos.sexo_id, "error_gender_id");
    validarPasswordCoincide(camposObtenidos.password_id, camposObtenidos.password_id2, "error_confirmPassword_id");
    

    

    

    console.log(validos);

    if ((idTimeout != undefined) && (idTimeout != null)) {
        clearTimeout(idTimeout);
    }//idTimeout



    let numCampos = campos.length;
    if (validos == numCampos) {
        setTimeout(function () {
            camposObtenidos.nombre_id.style.border = "";
            camposObtenidos.apellido_id.style.border = "";
            camposObtenidos.password_id.style.border = "";
            camposObtenidos.password_id2.style.border = "";
            camposObtenidos.sexo_id.style.border = "";
            camposObtenidos.correo_id.style.border = "";
            camposObtenidos.telefono_id.style.border = "";
            camposObtenidos.fecha_id.style.border = "";
           // alertCorrecto.innerHTML = "¡Tu registro se ha completado correctamente!";
           // alertCorrecto.style.display = "block";
           swal("¡Felicidades!", "¡Tu registro se ha completado correctamente!", "success");

            setTimeout(function () {
                alertCorrecto.style.display = "none";
            }, 2000);
            formulario.reset();
        }, 1000);
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
        arrayUsuarios.push(usuario)
        console.log(usuario);
        localStorage.setItem("Usuarios", JSON.stringify(arrayUsuarios));
    }

});