var btnEnviar = document.getElementById('btnEnviar');
var datos = localStorage.getItem('Usuarios');
var arrayDatos = JSON.parse(datos);
var usuario = {};
var validos = 0;
var idTimeout;
var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/        
var emailView = document.getElementById("email");
var contrasenaView = document.getElementById("contraseña_id");
var alertError = document.getElementById("alertError");


document.getElementById('formTest')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        alertError.style.display = "none" //Quitar mensaje de error
        alertError.innerHTML = "";

        if (emailView.value.match(emailRegex)==null) {
            alertError.style.display="block";
            alertError.innerHTML += "<br>El correo electrónico no es válido.";
            emailView.style.border="solid red 1px"
        }else{
            emailView.style.border="solid green 1px"
            validos++;
        }   
        
        buscarCorreo(emailView.value, contrasenaView.value);


    });

    

    function buscarCorreo(correo, contrasena) {
        for(let index = 0; index < arrayDatos.length; index++){
            if(correo === arrayDatos[index].correo){
                usuario = arrayDatos[index]
                console.log("Encontre el usuario", usuario);
            }           
            
        }  
        
        if(usuario.password === contrasena){
            alert("Inicio de sesión correcto");
        }
        else{
            alertError.style.display="block";
            alertError.innerHTML += "<br>Usuario y/o contraseña incorrecta";
            emailView.style.border="solid red 1px"
            contrasenaView.style.border="solid red 1px"
        }
        
    }

    

    
