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
        const publicacion = document.getElementById('publicacion').value;
  
        db.collection("publicacion").add({  
          title: titulopublicacion,
          text: publicacion,
          img: url,
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
      });
      });

}

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
        <i class="fas fa-trash-alt"></i>
      </div>
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
      `
  });
});

//borrar datos
db.collection("publicacion").doc("DC").delete().then(function() {
  console.log("Document successfully deleted!");
}).catch(function(error) {
  console.error("Error removing document: ", error);
});
