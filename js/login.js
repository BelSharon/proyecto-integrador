document.getElementById('formTest')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        let datos = localStorage.getItem('Usuarios');
        let arrayDatos = [];       
        let emailView = document.getElementById("email_id").value;
        let contrasenaView = document.getElementById("pssw_id").value;
        let alertError = document.getElementById("alertError");

        arrayDatos =JSON.parse(datos)? JSON.parse(datos): []; //if ternario

        alertError.style.display = "none" //Quitar mensaje de error
        alertError.innerHTML = "";

        if (arrayDatos.some((s)=> {return s.correo==emailView && s.password== contrasenaView})) {
            console.log("Debo direccionar al perfil de usuario");
           
        } else {
            alertError.style.display="block";
            alertError.innerHTML += "El correo o contraseña son inválidos";
            //correo.style.border="solid red 1px";
        }
        /*if (emailView.value.match(emailRegex)==null) {
            alertError.style.display="block";
            alertError.innerHTML += "<br>El correo electrónico no es válido.";
            emailView.style.border="solid red 1px"
        }else{
            emailView.style.border="solid green 1px"
            validos++;
        }   
        
        buscarCorreo(emailView.value, contrasenaView.value);*/


    });

    

    /*function buscarCorreo(correo, contrasena) {
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
        
    }*/
