//TODO
//Build a generic list for favorites, now playing, genres etc.
//Maybe w/ post cards (vert) with vert grid

let params = new URLSearchParams(document.location.search);
/* let id = params.get("id");
console.log(id) */

let query = document.location.search;
let bodyElm = document.body;

if (query.includes("with_cast")) {
  console.log("Actor's page")
} else if (query.includes("genre")) {
  console.log("Genres page")
}

let page = 1;
const gen_url = `https://api.themoviedb.org/3/discover/movie?${query}`
let gen_id = "items-genre"
const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const det_base_url = "https://api.themoviedb.org/3/movie/"

fetchData(gen_url, insertGenreCards)

function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'header-title': "Discover",
    'back': "",
    'toggle': "",
  })
  headerElm.append(siteHeaderElm)

  //Main
  let mainElm = initElement("main", {
    'class': "main-content",
  })
  let genreElm = initElement("movie-list", {
    'section-title': " ",
    'id': gen_id,
  })
  mainElm.append(genreElm)


  //Footer
  let footerElm = initElement("footer")
  let navFooter = initElement("nav-footer")
  footerElm.append(navFooter)

  //Append to body
  bodyElm.append(headerElm, mainElm, footerElm);
  //mainElm.querySelector(".section-subheader__title").classList.add(`genre-${id}`)
}

function insertGenreCards(json) {
  //Inject Genres
  let genreItemsElm = document.querySelector(`#${getMovieListID(gen_id)}`)
  json.results.map(movie => {
    genreItemsElm.append(createMovieCard(movie, "horizontal"))
    fetchData(det_base_url+movie.id, insertRuntimes)
  })
  fetchData(genres_url, insertGenres)
}

buildSite();