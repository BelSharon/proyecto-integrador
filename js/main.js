let btnEnviar=document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", function(event) {
event.preventDefault();
let emailRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

let validos=0;
let idTimeout;

let exampleFormControlInput1 = document.getElementById("exampleFormControlInput1");
let exampleFormControlInput2 = document.getElementById("exampleFormControlInput2");
let exampleFormControlInput3 = document.getElementById("exampleFormControlInput3");
let exampleFormControlTextarea1 = document.getElementById("exampleFormControlTextarea1");
let alertError = document.getElementById("alertError")
let  flexCheckDefault = document.getElementById("flexCheckDefault")

exampleFormControlTextarea1.value=exampleFormControlTextarea1.value.trim();
alertError.style.display="none";
console.log("[" + exampleFormControlInput1.value.replaceAll("  ","")+ "]" );






if (exampleFormControlTextarea1.value.trim().length<20) {
    alertError.innerHTML = "el mensaje debe tener 20 caracteres";
    alertError.style.display="block";
    exampleFormControlTextarea1.focus();
    exampleFormControlTextarea1.selected();
    exampleFormControlTextarea1.style.border="solid red 1px"
}else{
    exampleFormControlTextarea1.style.border="solid green 1px"
    validos++;
}

if (exampleFormControlInput1.value.length<8) {
    alertError.style.display="block";
    alertError.innerHTML += "<br>El Nombre no es válido.";
    exampleFormControlInput1.style.border="solid red 1px"
}else{
    exampleFormControlInput1.style.border="solid green 1px"
    validos++;
}




if (exampleFormControlInput2.value.match(emailRegex)==null) {
    alertError.style.display="block";
    alertError.innerHTML += "<br>El correo electónivo no es válido.";
    exampleFormControlInput2.style.border="solid red 1px"
}else{
    exampleFormControlInput2.style.border="solid green 1px"
    validos++;
}


let numRegex= /^[+]{1}[0-99]{3}[0-9]{9}$/;
if (exampleFormControlInput3.value.match(numRegex)==null) {
    alertError.style.display="block";
    alertError.innerHTML += "<br>El teléfono no es valido.";
    exampleFormControlInput3.style.border="solid red 1px"
}else{
    exampleFormControlInput3.style.border="solid green 1px"
    validos ++;
}

if((idTimeout != undefined)&&(idTimeout!=null)){
    clearTimeout(idTimeout);
}//idTimeout


//if ternario
alertError.innerHTML +=(! flexCheckDefault.checked)?"<br/> Debes aceptar los términos y condiciones":"";




/* if(! flexCheckDefault.checked){
    alertError.innerHTML += "<br/> Debes aceptar los términos y condiciones"
}
 */




if (validos==4) {
    setTimeout(function(){
        exampleFormControlInput1.style.border=""
        exampleFormControlInput2.style.border=""
        exampleFormControlTextarea1.style.border=""


    },3000);
}


});
