//Variables para realizar publicaciones
let $tituloId = document.getElementById('titulo_id');
let $formpost = document.querySelector('#formulariopost');
var $overlay = document.getElementById('overlay');
let $btnclose = document.getElementById('cerraroverlay');
let imgpreview = document.querySelector('img[id=previewimage]');
let cargaImgBtn = document.getElementById('cargaImgBtn');
let $readfile = new FileReader();

//variables de validaciones
let idTimeout;
let titulo = document.getElementById("titulo_id");
let publicacion = document.getElementById("publicacion_id");
let alertError = document.getElementById("alertError");       
let alertCorrecto = document.getElementById("alertCorrecto");
let validos = 0;

$tituloId.addEventListener('focus', entrarform)

//para expandir el formulario
    function entrarform(){              
        $formpost.classList.add('entrarform')
        $overlay.classList.add('entraroverlay')
        $btnclose.style.display = 'block'
        $tituloId.placeholder = 'Título'
    }

    $overlay.addEventListener('click', removeform)
    $btnclose.addEventListener('click', removeform)
    


    function removeform(){
        cargaImgBtn.style.display = ''   
        alertError.style.display = "none" 
        titulo.style.border = "none" 
        publicacion.style.border = "none"    
        $formpost.classList.remove('entrarform')
        $overlay.classList.remove('entraroverlay')
        $btnclose.style.display = 'none'
        $tituloId.placeholder = 'Publica tu trabajo'
        $readfile = new FileReader();
        imgpreview.src = ""
        $formpost.reset();
        validos = 0;
    }
    
    function previsualizarImagen(){
        let inputfile = document.getElementById('fileimg').files[0] ;
       
        if(inputfile){
            $readfile.readAsDataURL(inputfile)
            $readfile.onloadend=function(){
                imgpreview.src=$readfile.result;
            }
            cargaImgBtn.style.display = 'none'
            validos = 3;
        }else{
            imgpreview.src = '';
        }


    }

const btnEnviar = document.getElementById('btnEnviar');

$formpost.addEventListener('submit', function (event) {                                                                                 
        event.preventDefault();
        //btnEnviar.value = 'Enviando...';
        // const serviceID = 'default_service';
        // const templateID = 'template_wp16ogc';
        //emailjs.sendForm(serviceID, templateID, this);



        publicacion.value = publicacion.value.trim();
        alertError.style.display = "none" //Quitar mensaje de error
        alertError.innerHTML = "";
        if (publicacion.value.trim().replaceAll("", "").length < 20) {
            alertError.innerHTML = "La descripción debe contener 20 caracteres o más"
            alertError.style.display = "block";
            publicacion.focus();
            publicacion.select();
            publicacion.style.border = "solid red 1px" // color rojo al no estar correcto
        } else {
            publicacion.style.border = "solid green 1px" // color verde al  estar correcto
            validos++;
        }
        if (titulo.value.length < 3) {
            alertError.style.display = "block";
            alertError.innerHTML += "<br>El título no es válido.";
            titulo.style.border = "solid red 1px"
        } else {    
            titulo.style.border = "solid green 1px"
            validos++;
        }

        console.log(validos);

        if (validos == 0 || validos == 1 || validos == 2) {
            alertError.style.display = "block";
            alertError.innerHTML += "<br>Falta adjuntar imagen";
        }

        if ((idTimeout != undefined) && (idTimeout != null)) {
            clearTimeout(idTimeout);
        }//idTimeout

        if (validos == 5 || validos == 6) {
            // setTimeout(function () {
            //     titulo.style.border = "";
            //     publicacion.style.border = "";
            //     alertCorrecto.innerHTML = "¡Tu publicación ha sido realizada!";
            //     alertCorrecto.style.display = "block";

                
            // }, 2000);
            swal("¡Felicidades!", "¡Tu publicación ha sido realizada!", "success");

            let nuevaPublicacion = {
                titulo: titulo.value,
                descripcion: publicacion.value, 
                imagen: $readfile.result,
                fecha: new Date().toLocaleDateString()
            }

            addItem(nuevaPublicacion);
            removeform();
        }

        if($readfile.result) {          
            validos = 3;
        }
        else {
            validos = 0;
        }
    });

function publicarPost() {

}

/*función JSON de publicaciones*/ 
let publicaciones = new Array();
    


function addItem(item){

        publicaciones.unshift(item)
        localStorage.setItem('publicacion', JSON.stringify(publicaciones))      
        console.log(publicaciones);
        cargarCarrusel();
        
    }

function cargarCarrusel() {
    const itemsContainer = document.getElementById("list-items");
    let active = ''
    let contador = 1;
    itemsContainer.innerHTML = '';

    publicaciones.forEach(item => {
        if (contador === 1) {
            active = 'active'
        } else {
            active = ''
        }
    
        const itemHTML = 
            '   <div class="carousel-item ' + active + '">\n' +
            '   <img src="'+item.imagen +'" class="card-img-top" alt="" height="450px"> \n' + 
            '   <div class="card-body"> \n' +
            '       <h5 class="card-title">'+item.titulo+'</h5>' +
            '       <p class="card-text">'+item.descripcion+'</p>' +
            '        <p class="card-text"><small class="text-muted">'+item.fecha+'</small></p>' +            
                '</div> \n'+ 
                '</div> \n'; 
            
            itemsContainer.innerHTML += itemHTML;  
            contador++  
    })
}

/*Se quedó una imagen para poder visualizar el carrusel*/
addItem({'titulo':'Mi primer publicación',
    'imagen':'https://st2.depositphotos.com/3283693/11306/i/450/depositphotos_113066824-stock-photo-carpenter-man-working.jpg',
    'descripcion':'Terminando detalles para la colocación de un closet',
    'fecha' : `${new Date().toLocaleDateString()}`});

// addItem({'name':'Mi taller',
//     'img':'https://media.istockphoto.com/id/1061179190/es/foto/taller-de-carpinter%C3%ADa-sin-gente.jpg?s=612x612&w=0&k=20&c=zeNf-MiWbNjl2L88KM2smW3jCN-eKijPhqWoY7unrN4=',
//     'description':'Hoy comencé el día con un nuevo proyecto, donde el cliente me pidió hacer unos bancos para su cocina',
//     'date' : '23 de diciembre de 2022'});
    
// addItem({'name':'Seleccionando los insumos',
//     'img':'https://www.galdon.com/wp-content/uploads/2018/12/erp-venta-distribucion-madera-bricolaje.jpg',
//     'description':'El día de hoy toca seleccionar los materiales para un nuevo proyecto',
//     'date' : '27 de diciembre de 2022'});

// addItem({'name':'Última entrega 2022',
//     'img':'https://images.segundamano.mx/api/v1/smmx/images/14/1479717800.jpg?rule=webp_web_gallery_3x',
//     'description':'Cerrando el año con entregas, este es un comedor que me pidieron para un espacio muy pequeño',
//     'date' : '30 de diciembre de 2022'});   

// addItem({'name':'Primeras creaciones',
//     'img':'https://i.pinimg.com/originals/df/ac/43/dfac4352608574f7440b0895f3511e9c.jpg',
//     'description':'Mi primer paso en la carpinteria fue crear un librero para mi casa',
//     'date' : '1 de enero de 2022'});

// addItem({'name':'Muebles infantiles',
//     'img':'https://i.pinimg.com/564x/b1/08/89/b108891bf2688b69784ebf17849b7396.jpg',
//     'description':'Ahora mis libreros son diferentes, este fue creado para una estancia infantil ',
//     'date' : '2 de enero de 2022'});

// addItem({'name':'Más muebles infantiles',
//     'img':'https://http2.mlstatic.com/D_NQ_NP_722010-MEC43736691596_102020-O.jpg',
//     'description':'Entregué una cama Montessori para nues clientes más pequeños',
//     'date' : '2 de enero de 2022'});

// addItem({'name':'Muebles de consultorio',
//     'img':'https://i.pinimg.com/originals/e5/73/50/e573504b7c2da1145b3eadfc9bd9422d.jpg',
//     'description':'Hace unos meses inicié un proyecto para un consultorio médico y el día de hoy realicé la entrega',
//     'date' : '2 de enero de 2022'});
    
// addItem({'name':'Puerta rústica',
//     'img':'https://adnsureste.info/wp-content/uploads/2016/01/IMG_1560-21.jpg',
//     'description':'Coloqué una hermosa puerta, con clientes muy satisfecho',
//     'date' : '3 de enero de 2022'});

// addItem({'name':'Tomando cursos',
//     'img':'https://elgiroscopo.es/wp-content/uploads/2019/02/taller_alebrijes_tilcajete.jpg',
//     'description':'El día de hoy comencé un nuevo taller con grandes maestros para la elaboración de alebrijes y tallado artesanal',
//     'date' : '3 de enero de 2022'});   

