const searchButton = document.getElementById("searchButton");
const overlay = document.getElementById("modalOverlay");
const movieName = document.getElementById("movieName");
const movieYear = document.getElementById("movieYear");
const movieListContainer = document.getElementById("movieList");

let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

async function searchButtonClickHandler() {
  try {
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}}&y=${movieYearParameterGenerator()}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data: ", data);
    if (data.Error) {
      throw new Error("Filme não encontrado!");
    }
    createModal(data);
    overlay.classList.add("open");
  } catch (error) {
    notie.alert({ type: "error", text: error.message });
  }
}
function movieNameParameterGenerator() {
  if (movieName.value === "") {
    throw new Error("O nome do filme deve ser informado");
  }
  return movieName.value.split(" ").join("+");
}
function movieYearParameterGenerator() {
  if (movieYear.value === "") {
    return "";
  }
  if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))) {
    throw new Error("Ano do filme é inválido");
  }
  return `&y=${movieYear.value}`;
}

function addToList(movieObject) {
  movieList.push(movieObject);
}

function isMovieAlreadyOnList(id) {
  function doesThisIdBelongToThisMovie(movieObject) {
    return movieObject.imdbID === id;
  }
  return Boolean(movieList.find(doesThisIdBelongToThisMovie));
}

function updateUI(movieObject) {
  movieListContainer.innerHTML += `
  <article id="movieCard-${movieObject.imdbID}">
  <img id="moviePosterList" src=${movieObject.Poster} alt="Poster de ${movieObject.Title}"/>
  <button id="removeButton" onclick="{removeFilmFromList('${movieObject.imdbID}')}" >Remover <i class="bi bi-heartbreak"></i></button>
  </article>`;
}

function removeFilmFromList(id) {
  notie.confirm({
    text: "Deseja remover filme da lista?",
    submitText: "Sim",
    cancelText: "Não",
    position: "top",
    submitCallback: function removeMovie() {
      movieList = movieList.filter((movie) => movie.imdbID !== id);
      document.getElementById(`movieCard-${id}`).remove();
      updateLocalStorage();
    },
  });
}

function updateLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

for (const movieInfo of movieList) {
  updateUI(movieInfo);
}

searchButton.addEventListener("click", searchButtonClickHandler);
