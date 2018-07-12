// conexión firebase
function register(){
    const emailValue = email.value;
    const passwordValue = password.value; 
    const usuarioValue =  usuario.value;
    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue,usuarioValue)
        .then(()=>{
            console.log("Usuario registrado");
        })
        .catch((error)=>{
            console.log("Error de firebase > "+error.code);
            console.log("Error de firebase, mensaje > "+error.message);
        });
  }
function login(){
    const emailValue = email.value;
    const passwordValue = password.value;
    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
        .then(()=>{
            console.log("Usuario con login exitoso");
        })
        .catch((error)=>{
            console.log("Error de firebase > "+error.code);
            console.log("Error de firebase, mensaje > "+error.message);
        });
  }
  function loginFacebook(){
    const provider = new firebase.auth.FacebookAuthProvider();
    //provider.addScope("user_birthday"); tienen que pedirle permiso a facebook
    provider.setCustomParameters({
        'display': 'popup'
    }); 
    firebase.auth().signInWithPopup(provider)
        .then(()=>{
            console.log("Login con facebook");
        })
        .catch((error)=>{
            console.log("Error de firebase > "+error.code);
            console.log("Error de firebase, mensaje > "+error.message);
        });
  }

//Me gusta publicacion
const heart = document.getElementsByClassName('fa-heart');
heart.addEventListener('click', ()=> {
  heart.classList.toggle('red');
})

//Crear nuevo comentario, me gusta, eliminar
const boton = document.getElementById('btn');
boton.addEventListener('click', () => {
    let comments = document.getElementById('comment').value;
    document.getElementById('comment').value = '';
    const cont = document.getElementById('cont');
    const newComments = document.createElement('div');

    //Para que aparezca si o si comentario
    if(comments.length === 0 || comments === null){
      alert ('Debes ingresar un mensaje');
      return false;
    }
    
    //corazon
    const heart = document.createElement('i');
    heart.classList.add('fa', 'fa-heart', 'heart');
    //evento click corazon
    heart.addEventListener('click', ()=> {
      heart.classList.toggle('red');
    })
    
    //Basura
    const trash = document.createElement('i');
    trash.classList.add('fa', 'fa-trash', 'trash');
    //Evento click basura
    trash.addEventListener('click', ()=> {
        let confirmarEliminar = confirm('¿Estas seguro de eliminar?');
      if (confirmarEliminar == true) {
        cont.removeChild(newComments);
      }
    })

    //Crear p nuevo con comentario
    const contenedorElemento = document.createElement('p');
    let textNewComment = document.createTextNode(comments);
    contenedorElemento.appendChild(textNewComment);
    newComments.appendChild(heart);
    newComments.appendChild(trash);
    newComments.appendChild(contenedorElemento);
    cont.appendChild(newComments);
}) 