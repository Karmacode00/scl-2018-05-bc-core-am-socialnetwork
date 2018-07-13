// conexión firebase
window.onload = ()=>{
  firebase.auth().onAuthStateChanged((user)=>{
      if(user){
          //Si estamos logueados
          // loggedOut.style.display = "none";
          // loggedIn.style.display = "block";
          console.log("User > "+JSON.stringify(user));
      }else{
          //No estamos logueados
          // loggedOut.style.display = "block";
          // loggedIn.style.display = "none";
          console.log('Usuario no logeado');
      }
  });
}
function register(){
  const emailValue = email.value;
  const passwordValue = password.value; 
  // const usuarioValue =  usuario.value;
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
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
function logout(){
  firebase.auth().signOut()
      .then(()=>{
          console.log("Chao");
      })
      .catch();
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

//Me gusta y contador publicacion
let contadorPublicacion = [];
const heart = document.querySelector('i');
heart.addEventListener('click', ()=> {
  if (heart.classList.toggle('red')){
    contadorPublicacion++;
  }else{
    contadorPublicacion--;
  }
  return contador.innerHTML = contadorPublicacion;
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
    const contadorheart = document.createElement('span');
    heart.appendChild(contadorheart);
    heart.classList.add('fa', 'fa-heart', 'heart');
    //evento click corazon
    let contadorComentario = [];
    heart.addEventListener('click', ()=> {
      if (heart.classList.toggle('red')){
        contadorComentario++;
      }else{
        contadorComentario--;
      }
      return contadorheart.innerHTML = contadorComentario;
    })

    //Editar
    const edit = document.createElement('i');
    edit.classList.add('fas', 'fa-pencil-alt');
    //Evento click editar
    edit.addEventListener('click', ()=> {
      contenedorElemento.contentEditable = true;
      contenedorElemento.addEventListener('keydown', (event)=> {
        if (event.which == 13){
          let confirmarEditar = confirm('¿Estas seguro que quieres modificar tu comentario?');
          if (confirmarEditar == true) {
            contenedorElemento.removeAttribute('contentEditable');
          }
        }
      })
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
    newComments.appendChild(edit);
    newComments.appendChild(trash);
    newComments.appendChild(contenedorElemento);
    cont.appendChild(newComments);
  
})