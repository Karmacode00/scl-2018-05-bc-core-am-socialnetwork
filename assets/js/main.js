firebase.initializeApp({
  apiKey: "AIzaSyAsyUFU3YRE0ZFQBsX06RIr0jkZIwNDZrI",
  authDomain: "foodgram-65316.firebaseapp.com",
  projectId: "foodgram-65316",
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
db.collection("users").add({
  first: "Ada",
  last: "Lovelace",
  born: 1815
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
  console.error("Error adding document: ", error);
});

/*
const uploader = document.getElementById('uploader');
const fileButton = document.getElementById('fileButton');
 fileButton.addEventListener('change', function(e) {
 const file = e.target.files[0];
 const storageRef = firebase.storage().ref("'/fileLocation/'" + file.value);
 console.log(fileLocation);
 let task = storageRef.put(file);
 task.on('state_changed',
  function progress(snapshot){
    let percentage=( snapshot.bytesTransferred / snapshot.totalBytes )*100;
    uploader.value = percentage;
    if (percentage==100){
      alert("file uploaded Successfully");
    }
  },
  function error(err){
  },
  function complete(){
    }
  );
});
*/

/* Ejemplo en documentación de firebase
// File or Blob named mountains.jpg
var file = ...
// Create the file metadata
var metadata = {
  contentType: 'image/jpeg'
};
// Upload file and metadata to the object 'images/mountains.jpg'
var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
// Listen for state changes, errors, and completion of the upload.
uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;
    case 'storage/canceled':
      // User canceled the upload
      break;
    ...
    case 'storage/unknown':
      // Unknown error occurred, inspect error.serverResponse
      break;
  }
}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    console.log('File available at', downloadURL);
  });
});
*/

//Crear nuevo comentario, me gusta, eliminar
const boton = document.getElementById('btncomentario');
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
          } else {

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