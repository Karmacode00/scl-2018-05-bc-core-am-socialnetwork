firebase.initializeApp({
  apiKey: 'AIzaSyAsyUFU3YRE0ZFQBsX06RIr0jkZIwNDZrI',
  authDomain: 'foodgram-65316.firebaseapp.com',
  databaseURL: 'https://foodgram-65316.firebaseio.com',
  projectId: 'foodgram-65316',
  storageBucket: 'foodgram-65316.appspot.com',
  messagingSenderId: '186832450814'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Cerrar sesión
function logout() {
  firebase.auth().signOut()
    .then(() => {
      console.log('Logout exitoso');
      { window.location = 'login.html'; }
    })
    .catch();
}
// guardando en firebase imagen, titulo, texto
function guardar() {
  const custom = customFile.files[0];
  const fileName = custom.name;
  const metadata = {
    contentType: custom.type
  };
  const task = firebase.storage().ref('images')
    .child(fileName)
    .put(custom, metadata);
  task.then(snapshot => snapshot.ref.getDownloadURL()) // obtenemos la url de descarga (de la imagen)
    .then(url => {
      console.log('URL del archivo > ' + url);
      const titulopublicacion = document.getElementById('titulopublicacion').value;
      document.getElementById('titulopublicacion').value = '';
      const publicacion = document.getElementById('publicacion').value;
      document.getElementById('publicacion').value = '';

      db.collection('publicacion').add({
        title: titulopublicacion,
        text: publicacion,
        img: url
      })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });
    });
};

// leer documentos
const timeline = () => {
  let card = document.getElementById('cardPublicacion');
  db.collection('publicacion').onSnapshot((querySnapshot) => {
    card.innerHTML = '';
    querySnapshot.forEach((doc) => {
      card.innerHTML += `
      <div class="card col-lg-3">
        <img class="img-thumbnail" src="${doc.data().img}"text=Image cap" alt="Card image cap">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 justify-content-start cardPadding">
              <h4 class="card-title">${doc.data().title}</h4>
              <p class="card-text">${doc.data().text}</p>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-12 justify-content-start cardPadding">
                <ul class="nav">
                    <li class="fa fa-heart heart" id="like${doc.id}" onclick="like('${doc.id}')";"></li><span id="contador${doc.id}"></span>
                    <li class="fas fa-trash-alt" onclick="eliminar('${doc.id}')"></i>
                    <li class="fas fa-pencil-alt" onclick="editar('${doc.id}', '${doc.data().title}', '${doc.data().text}')"></i>
                  </ul>
            </div>
          </div>
        </div>

        <section class="center">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <textarea class="txt" id="comment${doc.id}" placeholder="Añade un comentario..."></textarea>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <button type="submit" class="btn" id="btncomentario" onclick="comentar('${doc.id}')">
                <i class="fas fa-plus" aria-hidden="true"></i> Comentar</button>
              </div>
            </div>
            <div class="row">
              <div class="col-12" id="cont${doc.id}"></div>
            </div>
          </div>
        </section>
      </div>
      `;
    });

    querySnapshot.forEach((doc) => {
      likesCount(doc.id);
    });
  });
};


function like(id) {
  let uid = firebase.auth().currentUser.uid;
  toggleStar(id, uid);
  likesCount(id);
}

// like post
function toggleStar(id, uid) {
  let route = db.collection('publicacion').doc(id).collection('likes').doc(uid);

  route.get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        route.delete().then(function() {
          console.log('Like successfully deleted!');
        }).catch(function(error) {
          console.error('Error removing document: ', error);
        });
      } else {
        db.collection('publicacion').doc(id).collection('likes').doc(uid).set({});
      }
    });
}

let likesCount = (id) => {
  const contador = document.getElementById('contador' + id);
  let heart = document.getElementById('like' + id);
  let likes = db.collection('publicacion').doc(id).collection('likes');
  let userId = firebase.auth().currentUser.uid;
  let likeFromUser = likes.doc(userId);

  likes.onSnapshot(function(doc) {
    contador.innerHTML = doc.size;
    likeFromUser.get().then(res => {
      if (res.exists) {
        heart.setAttribute('class', 'fa fa-heart heart red');
      } else if (!res.exists) {
        heart.setAttribute('class', 'fa fa-heart heart');
      }
    });
  });
};

// Editar publicacion
function editar(id, titulopublicacion, publicacion) {
  document.getElementById('titulopublicacion').value = titulopublicacion;
  document.getElementById('publicacion').value = publicacion;
  const boton = document.getElementById('btnPublicar');
  boton.innerHTML = 'Editar';
  alert('Sube para editar tu publicación');

  boton.onclick = function() {
    let washingtonRef = db.collection('publicacion').doc(id);
    const titulopublicacion = document.getElementById('titulopublicacion').value;
    const publicacion = document.getElementById('publicacion').value;

    return washingtonRef.update({
      title: titulopublicacion,
      text: publicacion,
    })
      .then(function() {
        console.log('Document successfully updated!');
        boton.innerHTML = 'Guardar';
        document.getElementById('titulopublicacion').value = '';
        document.getElementById('publicacion').value = '';
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error('Error updating document: ', error);
      });
  };
}

function eliminar(id) {
  let confirmarEliminar = confirm('¿Estas seguro de eliminar?');
  if (confirmarEliminar === true) {
    db.collection('publicacion').doc(id).delete().then(function() {
      console.log('Document successfully deleted!');
    }).catch(function(error) {
      console.error('Error removing document: ', error);
    });
  }
}
