let btnEnviar=document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", function(event) {
event.preventDefault();
let emailRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

let validos=0;
let idTimeout;

let nombre_id = document.getElementById("nombre_id");
let email_id = document.getElementById("email_id");
let telefono_id = document.getElementById("telefono_id");
let exampleFormControlTextarea1 = document.getElementById("exampleFormControlTextarea1");
let alertError = document.getElementById("alertError")







exampleFormControlTextarea1.value=exampleFormControlTextarea1.value.trim();
alertError.style.display="none";
console.log("[" + nombre_id.value.replaceAll("  ","")+ "]" );






if (exampleFormControlTextarea1.value.trim().length<20) {
    alertError.innerHTML = "el mensaje debe tener 20 caracteres";
    alertError.style.display="block";
    
    exampleFormControlTextarea1.style.border="solid red 1px"
}else{
    exampleFormControlTextarea1.style.border="solid green 1px"
    validos++;
}

if (nombre_id.value.length<8) {
    alertError.style.display="block";
    alertError.innerHTML += "<br>El Nombre no es válido.";
    nombre_id.style.border="solid red 1px"
}else{
    nombre_id.style.border="solid green 1px"
    validos++;
}




if (email_id.value.match(emailRegex)==null) {
    alertError.style.display="block";
    alertError.innerHTML += "<br>El correo electónivo no es válido.";
    email_id.style.border="solid red 1px"
}else{
    email_id.style.border="solid green 1px"
    validos++;
}


let numRegex= /^[+]{1}[0-99]{3}[0-9]{9}$/;
if (telefono_id.value.match(numRegex)==null) {
    alertError.style.display="block";
    alertError.innerHTML += "<br>El teléfono no es valido.";
    telefono_id.style.border="solid red 1px"
}else{
    telefono_id.style.border="solid green 1px"
    validos ++;
}

if((idTimeout != undefined)&&(idTimeout!=null)){
    clearTimeout(idTimeout);
}//idTimeout








/* if(! flexCheckDefault.checked){
    alertError.innerHTML += "<br/> Debes aceptar los términos y condiciones"
}
 */




if (validos==4) {
    setTimeout(function(){
        nombre_id.style.border=""
        email_id.style.border=""
        exampleFormControlTextarea1.style.border=""

      document.nodeName
             
            
        


        


    },3000);
}


});
