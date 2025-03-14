let params = new URLSearchParams(document.location.search);
/* let id = params.get("id");*/

let query = document.location.search;
let bodyElm = document.body;
/* query.includes("with_cast"), query.includes("genre") */

let page = 1;
const dis_url = `https://api.themoviedb.org/3/discover/movie?${query}`
let gen_id = "items-collections"
const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const det_base_url = "https://api.themoviedb.org/3/movie/"

let topic = params.get("dTopic");

let onGenres = query.includes("with_genres")
let onActors = query.includes("with_cast")
let onNowPlaying = query.includes("movie/now_playing")
let onPopular = query.includes("movie/popular")

console.log(onGenres,onActors,onNowPlaying,onPopular)

if (onGenres) {
  topic = allGenres.find(item => item.id === Number(topic)).name
}

let collectionTitle = `Movies tagged with '${topic}'`





fetchData(dis_url, insertCollectionCards)
function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'header-title': "Collection",
    'back': "",
    'toggle': "",
  })
  headerElm.append(siteHeaderElm)

  //Main
  let mainElm = initElement("main", {
    'class': "content-main",
  })
  let listElm = initElement("card-list", {
    'section-title': collectionTitle,
    'id': gen_id,
  })
  mainElm.append(listElm)


  //Footer
  let footerElm = initElement("footer")
  let navFooter = initElement("nav-footer")
  footerElm.append(navFooter)

  //Append to body
  bodyElm.append(headerElm, mainElm, footerElm);
  //mainElm.querySelector(".section-subheader__title").classList.add(`genre-${id}`)
}

function insertCollectionCards(json) {
  //Inject Genres
  let genreItemsElm = document.querySelector(`#${getMovieListID(gen_id)}`)
  json.results.map(movie => {
    genreItemsElm.append(createMovieCard(movie, "horizontal"))
    fetchData(det_base_url + movie.id, insertRuntimes)
  })
   //fetchData(genres_url, insertGenres);
   insertGenresLocal(allGenres)
}

buildSite();


