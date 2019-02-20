// Crear nuevo comentario, me gusta, eliminar
function comentar(id) {
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
      saveButton.onclick = () =>{
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
}

document.getElementById('profileBtn').addEventListener('click', () =>{
  document.getElementById('home').style.display = 'none';
  document.getElementById('profilePage').style.display = 'block';
});

document.getElementById('homeBtn').addEventListener('click', () =>{
  document.getElementById('home').style.display = 'block';
  document.getElementById('profilePage').style.display = 'none';
});