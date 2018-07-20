firebase.initializeApp({
  apiKey: "AIzaSyAsyUFU3YRE0ZFQBsX06RIr0jkZIwNDZrI",
  authDomain: "foodgram-65316.firebaseapp.com",
  databaseURL: "https://foodgram-65316.firebaseio.com",
  projectId: "foodgram-65316",
  storageBucket: "foodgram-65316.appspot.com",
  messagingSenderId: "186832450814"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Cerrar sesión
function logout(){
  firebase.auth().signOut()
  .then(()=>{
    console.log("Chao");
    {window.location="/src/login.html"}
  })
  .catch();
}
//guardando en firebase imagen, titulo, texto
function guardar(){
  const custom = customFile.files[0];
  const fileName = custom.name;
  const metadata = {
    contentType: custom.type
  };
  const task = firebase.storage().ref('images') 
    .child(fileName)
    .put(custom, metadata);
  task.then(snapshot => snapshot.ref.getDownloadURL())  //obtenemos la url de descarga (de la imagen)
  .then(url => {
    console.log("URL del archivo > "+url);
    const titulopublicacion = document.getElementById('titulopublicacion').value;
    document.getElementById('titulopublicacion').value = '';
    const publicacion = document.getElementById('publicacion').value;
    document.getElementById('publicacion').value = '';

    db.collection("publicacion").add({  
      title: titulopublicacion,
      text: publicacion,
      img: url,
      like: 0,
      // comments: comentario,
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  });
};

//leer documentos
let card = document.getElementById('cardPublicacion');
db.collection("publicacion").onSnapshot((querySnapshot) => {
  card.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().img}`);
    card.innerHTML += `
      <div class="card">
        <img class="card-img-top" src="${doc.data().img}"text=Image cap" alt="Card image cap">
        <h5 class="card-title">${doc.data().title}</h5>
        <p class="card-text">${doc.data().text}</p>
        <i class="fas fa-heart" id="hola" onclick="like()" ></i><span id="contador"></span>
        <i class="fas fa-trash-alt" onclick="eliminar('${doc.id}')"></i>
        <i class="fas fa-pencil-alt" onclick="editar('${doc.id}', '${doc.data().title}', '${doc.data().text}')"></i>
        
        <section class="center">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <textarea class="txt" id="comment" placeholder="Añade un comentario..."></textarea>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button type="submit" class="btn" id="btncomentario" onclick="comentar()">
                <i class="fas fa-plus" aria-hidden="true"></i> Comentar</button>
              </div>
            </div>
            <div class="row">
              <div class="col-12" id="cont"></div>
            </div>
          </div>
        </section>
      </div>
      `
  });
});

/*
function guardarComentario(){
  //Crear nuevo comentario, me gusta, eliminar
  let comments = document.getElementById('comment').value;
  document.getElementById('comment').value = '';
  const cont = document.getElementById('cont');
  const newComments = document.createElement('div');
  
  //Para que aparezca si o si comentario
  if(comments.length === 0 || comments === null){
    alert ('Debes ingresar un mensaje');
    return false;
  }

  //Crear p nuevo con comentario
  const contenedorElemento = document.createElement('p');
  let textNewComment = document.createTextNode(comments);
  contenedorElemento.appendChild(textNewComment);
  newComments.appendChild(contenedorElemento);
  cont.appendChild(newComments);

  db.collection("publicacion").doc(id).push().then(function() {
    comentario : comments
  })
  .then(function() {
    console.log("Document successfully updated!");
  })
}
*/

//Editar publicacion
function editar(id, titulopublicacion, publicacion) {
  document.getElementById('titulopublicacion').value = titulopublicacion;
  document.getElementById('publicacion').value = publicacion;
  const boton = document.getElementById('btnPublicar');
  boton.innerHTML = 'Editar';
  alert('Sube para editar tu publicación');

  boton.onclick = function() {
    var washingtonRef = db.collection("publicacion").doc(id);
    // Set the "capital" field of the city 'DC'
    const titulopublicacion = document.getElementById('titulopublicacion').value;
    const publicacion = document.getElementById('publicacion').value;

    return washingtonRef.update({
      title: titulopublicacion,
      text: publicacion,
    })
    .then(function() {
      console.log("Document successfully updated!");
      boton.innerHTML = 'Guardar';
      document.getElementById('titulopublicacion').value = '';
      document.getElementById('publicacion').value = '';
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
  }
}

function eliminar(id) {
  let confirmarEliminar = confirm('¿Estas seguro de eliminar?');
  if (confirmarEliminar == true) {
    db.collection("publicacion").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
    }).catch(function(error) {
    console.error("Error removing document: ", error);
    });
  }
}

function like() {
  let contadorPublicacion = [];
  const heart = document.getElementById('hola');
  heart.addEventListener('click', ()=> {
  if (heart.classList.toggle('red')){
  contadorPublicacion++;
  }else{
  contadorPublicacion--;
  }
  return contador.innerHTML = contadorPublicacion;
  })
}

/*
//like post
function toggleStar(docRef, uid) {
var docRef = db.collection("publicacion").doc(id) ;

  docRef.transaction(function(like) {
    if (like) {
      if (like.stars && like.stars[uid]) {
        like.starCount--;
        like.stars[uid] = null;
      } else {
        like.starCount++;
        if (!like.stars) {
          like.stars = {};
        }
        like.stars[uid] = true;
      }
    }
    return like;
  });
}
*/