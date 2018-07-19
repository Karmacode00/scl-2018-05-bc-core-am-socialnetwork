// conexión firebase
window.onload = ()=>{
  firebase.auth().onAuthStateChanged((user)=>{
    if(user){
      //Si estamos logueados
      // loggedOut.style.display = "none";
      // loggedIn.style.display = "block";
      console.log("User > "+JSON.stringify(user));
      {window.location="/src/prueba.html"}
      //   alert("Bienvenido(a)")
    }else{
      //No estamos logueados
      // loggedOut.style.display = "block";
      // loggedIn.style.display = "none";
      console.log('Usuario no logeado');
      //   alert("Iniciar Sesión")    
    }
  });
}

function login(){
  const emailValue = email.value;
  const passwordValue = password.value;
  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
  .then(()=>{
    console.log("Usuario con login exitoso");
    //   {window.location="/src/index.html"}
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
    //   {window.location="/src/index.html"}
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
  firebase.auth().signInWithPopup(provider)
  .then((result) =>{   
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
     console.log("Login con Google");
    //  {window.location="/src/index.html"}
  })
  .catch((error) => {
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
    
// Cerrar sesión
function logout(){
  firebase.auth().signOut()
  .then(()=>{
    console.log("Chao");
    {window.location="/src/login.html"}
  })
  .catch();
}
  
  // Registro de usuario
function register(){
  const emailValue = email.value;
  const passwordValue = password.value; 
  // const usuarioValue =  usuario.value;
  firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
  .then(()=>{
    console.log("Usuario registrado");
    {window.location="/src/prueba.html"}
  })
  .catch((error)=>{
    console.log("Error de firebase > "+error.code);
    console.log("Error de firebase, mensaje > "+error.message);
  });
}
