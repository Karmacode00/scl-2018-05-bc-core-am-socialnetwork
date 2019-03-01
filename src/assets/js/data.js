// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();


export function guardar(custom, fileName, metadata) {
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

export function leerPosts(cambioPosts) {
  let publicaciones = db.collection('publicacion');
    
  publicaciones.onSnapshot((querySnapshot) =>{
    cambioPosts(querySnapshot);
  });
};

// like post
export function toggleStar(id, uid) {
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

export function totalLikes(id) {
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
}

export function editarPublicacion(id, titulopublicacion, publicacion) {
  let washingtonRef = db.collection('publicacion').doc(id);

  return washingtonRef.update({
    title: titulopublicacion,
    text: publicacion,
  })
    .then(function() {
      console.log('Document successfully updated!');
      document.getElementById('titulopublicacion').value = '';
      document.getElementById('publicacion').value = '';
    })
    .catch(function(error) {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
}

export function eliminarPublicacion(id) {
  db.collection('publicacion').doc(id).delete().then(function() {
    console.log('Document successfully deleted!');
  }).catch(function(error) {
    console.error('Error removing document: ', error);
  });
}