const background = document.getElementById("modalBackground");
const modalContainer = document.getElementById("modalContainer");

let currentMovie = {};

function backgroundClickHandler() {
  overlay.classList.remove("open");
}

function closeModal() {
  overlay.classList.remove("open");
}

function addCurrentMovieToList() {
  if (isMovieAlreadyOnList(currentMovie.imdbID)) {
    notie.alert({ type: "error", text: "Filme já está na lista!" });
    return;
  }
  addToList(currentMovie);
  updateUI(currentMovie);
  updateLocalStorage();
  closeModal();
}

function createModal(data) {
  currentMovie = data;

  modalContainer.innerHTML = `
  <h2 id="movieTitle">${data.Title} - ${data.Year}</h2>
  <section id="modalBody">
    <img id="moviePoster" src=${data.Poster} alt="Poster do Filme"/>
    <div id="movieInfo">
      <h3 id="movieplot">${data.Plot}</h3>
    <div id="movieCast">
      <h4>Elenco:</h4>
      <h5>${data.Actors}</h5>
    </div>
    <div id="movieGenre">
      <h4>Gênero:</h4>
      <h5>${data.Genre}</h5>
    </div>
    </div>
    </section>
    <section id="modalFooter">
      <button id="addToList" onclick='{addCurrentMovieToList()}'>Amei <i class="bi bi-bookmark-heart"></i></button>
    </section>`;
}

background.addEventListener("click", backgroundClickHandler);
