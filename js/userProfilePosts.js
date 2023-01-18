/*función para subir imagen*/ 
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
                alertCorrecto.innerHTML = "¡Tu publicación ha sido realizada!";
                alertCorrecto.style.display = "block";
                formulario.reset();
                formulario2.reset();
            }, 2000);
        }
    });

/*función JSON de publicaciones*/ 
let publicacion = new Array();
    
let contador = 1;

function addItem(item){
    
    let active = ''

    if (contador === 1) {
        active = 'active'
    }

    const itemHTML = 
        '   <div class="carousel-item ' + active + '">\n' +
        '   <img src="'+item.img+'" class="card-img-top" alt="" height="450px"> \n' + 
        '   <div class="card-body"> \n' +
        '       <h5 class="card-title">'+item.name+'</h5>' +
        '       <p class="card-text">'+item.description+'</p>' +
        '        <p class="card-text"><small class="text-muted">'+item.date+'</small></p>' +            
            '</div> \n'+ 
            '</div> \n'; 
        
        const itemsContainer = document.getElementById("list-items");
        itemsContainer.innerHTML += itemHTML;  
        contador++  

        publicacion.push(item)
        localStorage.setItem('publicacion', JSON.stringify(publicacion))      
        console.log(publicacion);publicacion.push(item)
        localStorage.setItem('publicacion', JSON.stringify(publicacion))      
        console.log(publicacion);
    }

addItem({'name':'Mi primer publicación',
    'img':'https://st2.depositphotos.com/3283693/11306/i/450/depositphotos_113066824-stock-photo-carpenter-man-working.jpg',
    'description':'Terminando detalles para la colocación de un closet',
    'date' : '22 de diciembre de 2022'});

addItem({'name':'Mi taller',
    'img':'https://media.istockphoto.com/id/1061179190/es/foto/taller-de-carpinter%C3%ADa-sin-gente.jpg?s=612x612&w=0&k=20&c=zeNf-MiWbNjl2L88KM2smW3jCN-eKijPhqWoY7unrN4=',
    'description':'Hoy comence el día con un nuevo proyecto, donde el cliente me pidió hacer unos bancos para su cocina',
    'date' : '23 de diciembre de 2022'});
    
addItem({'name':'Seleccionando los insumos',
    'img':'https://www.galdon.com/wp-content/uploads/2018/12/erp-venta-distribucion-madera-bricolaje.jpg',
    'description':'El día de hoy toca seleccionar los materiales para un nuevo proyecto',
    'date' : '27 de diciembre de 2022'});

addItem({'name':'Última entrega 2022',
    'img':'https://images.segundamano.mx/api/v1/smmx/images/14/1479717800.jpg?rule=webp_web_gallery_3x',
    'description':'Cerrando el año con entregas, este es un comedor que me pidieron para un espacio muy pequeño',
    'date' : '30 de diciembre de 2022'});   

addItem({'name':'Primeras creaciones',
    'img':'https://i.pinimg.com/originals/df/ac/43/dfac4352608574f7440b0895f3511e9c.jpg',
    'description':'Mi primer paso en la carpinteria fue crear un librero para mi casa',
    'date' : '1 de enero de 2022'});

addItem({'name':'Muebles infantiles',
    'img':'https://i.pinimg.com/564x/b1/08/89/b108891bf2688b69784ebf17849b7396.jpg',
    'description':'Ahora mis libreros son diferentes, este fue creado para una estancia infantil ',
    'date' : '2 de enero de 2022'});

addItem({'name':'Más muebles infantiles',
    'img':'https://http2.mlstatic.com/D_NQ_NP_722010-MEC43736691596_102020-O.jpg',
    'description':'Entregué una cama Montessori para nues clientes más pequeños',
    'date' : '2 de enero de 2022'});

addItem({'name':'Muebles de consultorio',
    'img':'https://i.pinimg.com/originals/e5/73/50/e573504b7c2da1145b3eadfc9bd9422d.jpg',
    'description':'Hace unos meses inicié un proyecto para un consultorio médico y el día de hoy realicé la entrega',
    'date' : '2 de enero de 2022'});
    
addItem({'name':'Puerta rústica',
    'img':'https://adnsureste.info/wp-content/uploads/2016/01/IMG_1560-21.jpg',
    'description':'Coloqué una hermosa puerta, con clientes muy satisfecho',
    'date' : '3 de enero de 2022'});

addItem({'name':'Tomando cursos',
    'img':'https://elgiroscopo.es/wp-content/uploads/2019/02/taller_alebrijes_tilcajete.jpg',
    'description':'El día de hoy comencé un nuevo taller con grandes maestros para la elaboración de alebrijes y tallado artesanal',
    'date' : '3 de enero de 2022'});   
    