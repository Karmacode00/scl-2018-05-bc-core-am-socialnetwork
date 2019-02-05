document.addEventListener('DOMContentLoaded', function () {
  bsCustomFileInput.init();
});

// conexión firebase
window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //Si estamos logueados
      loginPage.style.display = "none";
      buttons.style.display = "block"
      newPostPage.style.display = "block";
      home.style.display = "block";
      profilePage.style.display = "none";
      registerPage.style.display = "none";
      timeline();
    } else {
      loginPage.style.display = "block";
      buttons.style.display = "none"
      home.style.display = "none";
      newPostPage.style.display = "none";
      profilePage.style.display = "none";
      registerPage.style.display = "none";
    }
  });
}

function login() {
  const emailValue = email.value;
  const passwordValue = password.value;
  firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
    .then(() => {
      loginPage.style.display = "none";
      buttons.style.display = "block"
      newPostPage.style.display = "block";
      home.style.display = "block";
      profilePage.style.display = "none";
      registerPage.style.display = "none";
      timeline();
      console.log("Usuario con login exitoso");
    })
    .catch((error) => {
      console.log("Error de firebase > " + error.code);
      console.log("Error de firebase, mensaje > " + error.message);
      alert("Usuario no registrado");
    });
  return false;
}

facebookLogin.addEventListener("click", () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  //provider.addScope("user_birthday"); tienen que pedirle permiso a facebook
  provider.setCustomParameters({
    'display': 'popup'
  });
  firebase.auth().signInWithPopup(provider)
    .then(() => {
      loginPage.style.display = "none";
      buttons.style.display = "block"
      newPostPage.style.display = "block";
      home.style.display = "block";
      profilePage.style.display = "none";
      registerPage.style.display = "none";
      timeline();
    })
    .catch((error) => {
      console.log("Error de firebase > " + error.code);
      console.log("Error de firebase, mensaje > " + error.message);
    });
});

googleLogin.addEventListener("click", () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    'login_hint': 'user@example.com'
  });
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      loginPage.style.display = "none";
      buttons.style.display = "block"
      newPostPage.style.display = "block";
      home.style.display = "block";
      profilePage.style.display = "none";
      registerPage.style.display = "none";
      timeline();
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
    })
})

// Cerrar sesión
logoutBtn.addEventListener("click", () => {
  firebase.auth().signOut()
    .then(() => {
      console.log("Chao");
      loginPage.style.display = "block";
      buttons.style.display = "none"
      newPostPage.style.display = "none";
      home.style.display = "none";
      profilePage.style.display = "none";
      registerPage.style.display = "none";
    })
    .catch();
});

// Registro de usuario
registration.addEventListener("click", () => {
  loginPage.style.display = "none";
  buttons.style.display = "none"
  newPostPage.style.display = "none";
  home.style.display = "none";
  profilePage.style.display = "none";
  registerPage.style.display = "block";

  register.addEventListener("click", () => {
    const emailValue = registerEmail.value;  
    const passwordValue = registerPassword.value;
    // const usuarioValue =  registerUser.value;
    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
      .then(() => {
        console.log("Usuario registrado");
      })
      .catch((error) => {
        console.log("Error de firebase > " + error.code);
        console.log("Error de firebase, mensaje > " + error.message);
      });
  });
})
