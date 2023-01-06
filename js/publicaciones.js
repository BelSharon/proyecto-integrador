let validos = 0;
btnFake.addEventListener('click', function () {
    fileImage.click();
});

fileImage.addEventListener('change', function () {
    previewFile('imageFile', 'fileImage', 'inputFile')
    //previewFile(id imagen, input type file , textArea);
});


//previewFile(id imagen, input type file , textArea);
function previewFile(img, inputFile, input) {

    var preview = document.getElementById(img);
    var file = document.getElementById(inputFile).files[0];
    var reader = new FileReader();

    reader.addEventListener("load", function () {
        document.getElementById(input).value = reader.result;
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.readAsDataURL(file);
        validos = 3;
        console.log(validos);
    }         // file

}// previewFile 
const btnEnviar = document.getElementById('btnEnviar');
document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();
        //btnEnviar.value = 'Enviando...';
        // const serviceID = 'default_service';
        // const templateID = 'template_wp16ogc';
        //emailjs.sendForm(serviceID, templateID, this);

        let idTimeout;
        let titulo = document.getElementById("titulo_id");
        let publicacion = document.getElementById("publicacion_id");
        let alertError = document.getElementById("alertError");
        let formulario = document.getElementById('form');
        let formulario2 = document.getElementById('form2');
        let alertCorrecto = document.getElementById("alertCorrecto");

        publicacion.value = publicacion.value.trim();
        alertError.style.display = "none" //Quitar mensaje de error
        alertError.innerHTML = "";
        if (publicacion.value.trim().replaceAll("", "").length < 20) {
            alertError.innerHTML = "La descripción debe contener 20 caracteres o más"
            alertError.style.display = "block";
            publicacion.focus();
            publicacion.select();
            publicacion.style.border = "solid red 1px" // color rojo al no estar correcto
            validos = 0;
        } else {
            publicacion.style.border = "solid green 1px" // color verde al  estar correcto
            validos++;
        }
        if (titulo.value.length < 3) {
            alertError.style.display = "block";
            alertError.innerHTML += "<br>El título no es válido.";
            titulo.style.border = "solid red 1px"
            validos = 0;
        } else {
            titulo.style.border = "solid green 1px"
            validos++;
        }




        console.log(validos);

        if (validos == 0 || validos == 1 || validos == 2 || validos == 3 || validos == 4) {
            alertError.style.display = "block";
            alertError.innerHTML += "<br>Falta adjuntar imagen";

        }



        if ((idTimeout != undefined) && (idTimeout != null)) {
            clearTimeout(idTimeout);
        }//idTimeout





        if (validos == 5 || validos == 6) {
            setTimeout(function () {
                titulo.style.border = "";
                publicacion.style.border = "";
                alertCorrecto.innerHTML = "¡Tu publicación ha sido publicada!";
                alertCorrecto.style.display = "block";
                formulario.reset();
                formulario2.reset();
            }, 2000);
        }


    });










