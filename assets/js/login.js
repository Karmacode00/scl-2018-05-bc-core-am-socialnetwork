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
function loginGoogle(){
var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
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
