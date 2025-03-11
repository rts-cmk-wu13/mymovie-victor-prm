//TODO
//Build a generic list for favorites, now playing, genres etc.
//Maybe w/ post cards (vert) with vert grid

let params = new URLSearchParams(document.location.search);
/* let id = params.get("id");*/

let query = document.location.search;
let bodyElm = document.body;
/* query.includes("with_cast"), query.includes("genre") */

let page = 1;
const dis_url = `https://api.themoviedb.org/3/discover/movie?${query}`
let gen_id = "items-genre"
const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const det_base_url = "https://api.themoviedb.org/3/movie/"

let topic = params.get("dTopic");
let test;
if (query.includes("with_genres")) {
  topic = allGenres.find(item => item.id === Number(topic)).name
}

let discoverTitle = `Movies tagged with '${topic}'`





fetchData(dis_url, insertDiscoverCards)
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
    'section-title': discoverTitle,
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

function insertDiscoverCards(json) {
  //Inject Genres
  let genreItemsElm = document.querySelector(`#${getMovieListID(gen_id)}`)
  json.results.map(movie => {
    genreItemsElm.append(createMovieCard(movie, "horizontal"))
    fetchData(det_base_url + movie.id, insertRuntimes)
  })
  fetchData(genres_url, insertGenres)
}

buildSite();


