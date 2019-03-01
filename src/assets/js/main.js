import { register, login, facebookLogin, googleLogin, logout } from './login.js';
import { guardar, leerPosts, toggleStar, totalLikes, editarPublicacion, eliminarPublicacion } from './data.js';

document.addEventListener('DOMContentLoaded', function() {
  bsCustomFileInput.init();
});

window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loginPage.style.display = 'none';
      buttons.style.display = 'block';
      newPostPage.style.display = 'block';
      home.style.display = 'block';
      profilePage.style.display = 'none';
      registerPage.style.display = 'none';
      timeline();
    } else {
      loginPage.style.display = 'block';
      buttons.style.display = 'none';
      home.style.display = 'none';
      newPostPage.style.display = 'none';
      profilePage.style.display = 'none';
      registerPage.style.display = 'none';
    }
  });
};

loginBtn.addEventListener('click', () => {
  login();
});

facebookLoginBtn.addEventListener('click', () => {
  facebookLogin();
});

googleLoginBtn.addEventListener('click', () => {
  googleLogin();
});

logoutBtn.addEventListener('click', () => {
  logout();
  loginPage.style.display = 'block';
  buttons.style.display = 'none';
  newPostPage.style.display = 'none';
  home.style.display = 'none';
  profilePage.style.display = 'none';
  registerPage.style.display = 'none';
});

// Registro de usuario
registration.addEventListener('click', () => {
  loginPage.style.display = 'none';
  buttons.style.display = 'none';
  newPostPage.style.display = 'none';
  home.style.display = 'none';
  profilePage.style.display = 'none';
  registerPage.style.display = 'block';
  registerBtn.addEventListener('click', () => {
    register();
  });
});

btnPublicar.addEventListener('click', () => {
  const custom = customFile.files[0];
  const fileName = custom.name;
  const metadata = {
    contentType: custom.type
  };

  guardar(custom, fileName, metadata);
});

// leer documentos
const timeline = () => {
  let card = document.getElementById('cardPublicacion');
  leerPosts((querySnapshot) => {
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
                      <li class="fa fa-heart heart" id="like${doc.id}"></li><span id="contador${doc.id}"></span>
                      <li class="fas fa-trash-alt" id="eliminar${doc.id}"></i>
                      <li class="fas fa-pencil-alt" id="editar${doc.id}"></i>
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
                  <button type="submit" class="btn" id="comentar${doc.id}">
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
      like(doc.id);
      eliminar(doc.id);
      editar(doc.id, doc.data().title, doc.data().text);
      comentar(doc.id);
    });
  });
};

function like(id) {
  let likeBtn = document.getElementById('like' + id);

  likeBtn.addEventListener('click', () => {
    let uid = firebase.auth().currentUser.uid;
    toggleStar(id, uid);
    likesCount(id);
  });
}

let likesCount = (id) => {
  totalLikes(id);
};

function editar(id, titulopublicacion, publicacion) {
  let editBtn = document.getElementById('editar' + id);
    
  editBtn.addEventListener('click', () => {
    document.getElementById('titulopublicacion').value = titulopublicacion;
    document.getElementById('publicacion').value = publicacion;
    const boton = document.getElementById('btnPublicar');
    boton.innerHTML = 'Editar';
    alert('Sube para editar tu publicación');
    
    boton.addEventListener('click', () => {
      const titulopublicacion = document.getElementById('titulopublicacion').value;
      const publicacion = document.getElementById('publicacion').value;
      editarPublicacion(id, titulopublicacion, publicacion);
      boton.innerHTML = 'Guardar';
    });
  });
};

function eliminar(id) {
  let deleteBtn = document.getElementById('eliminar' + id);

  deleteBtn.addEventListener('click', () => {
    let confirmarEliminar = confirm('¿Estas seguro de eliminar?');
    if (confirmarEliminar === true) {
      eliminarPublicacion(id);
    }
  });
}

// Crear nuevo comentario, me gusta, eliminar
function comentar(id) {
  let commentBtn = document.getElementById('comentar' + id);

  commentBtn.addEventListener('click', () => {
    let comments = document.getElementById('comment' + id).value;
    document.getElementById('comment' + id).value = '';
    const cont = document.getElementById('cont' + id);
    const newComments = document.createElement('div');
    
    // Para que aparezca si o si comentario
    if (comments.length === 0 || comments === null) {
      alert('Debes ingresar un mensaje');
      return false;
    }
    
    // corazon
    const heart = document.createElement('i');
    const contadorheart = document.createElement('span');
    heart.appendChild(contadorheart);
    heart.classList.add('fa', 'fa-heart', 'heart');
    // evento click corazon
    let contadorComentario = [];
    heart.addEventListener('click', () => {
      if (heart.classList.toggle('red')) {
        contadorComentario++;
      } else {
        contadorComentario--;
      }
      return contadorheart.innerHTML = contadorComentario;
    });
    
    // Editar comentario
    const edit = document.createElement('i');
    edit.classList.add('fas', 'fa-pencil-alt');
    // Evento click editar
    edit.addEventListener('click', () => {
      contenedorElemento.contentEditable = true;
      let confirmarEditar = confirm('¿Estas seguro que quieres modificar tu comentario?');
      if (confirmarEditar === true) {
        const editComment = contenedorElemento.textContent;
        const newCommentEdit = document.createElement('input');
        newCommentEdit.setAttribute('type', 'text');
        newCommentEdit.value = editComment;
        newComments.removeChild(contenedorElemento);
        newComments.appendChild(newCommentEdit);
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Guardar';
        newComments.appendChild(saveButton);
        saveButton.onclick = () => {
          const editedComment = newCommentEdit.value;
          contenedorElemento.textContent = editedComment;
          newComments.removeChild(newCommentEdit);
          newComments.removeChild(saveButton);
          newComments.appendChild(contenedorElemento);
        };
      }
    });
    
    // Basura
    const trash = document.createElement('i');
    trash.classList.add('fa', 'fa-trash', 'trash');
    // Evento click basura
    trash.addEventListener('click', () => {
      let confirmarEliminar = confirm('¿Estas seguro de eliminar?');
      if (confirmarEliminar === true) {
        cont.removeChild(newComments);
      }
    });
    
    // Crear p nuevo con comentario
    const contenedorElemento = document.createElement('p');
    let textNewComment = document.createTextNode(comments);
    contenedorElemento.appendChild(textNewComment);
    newComments.appendChild(heart);
    newComments.appendChild(edit);
    newComments.appendChild(trash);
    newComments.appendChild(contenedorElemento);
    cont.appendChild(newComments);
  });
}

document.getElementById('profileBtn').addEventListener('click', () => {
  document.getElementById('home').style.display = 'none';
  document.getElementById('profilePage').style.display = 'block';
});

document.getElementById('homeBtn').addEventListener('click', () => {
  document.getElementById('home').style.display = 'block';
  document.getElementById('profilePage').style.display = 'none';
});
