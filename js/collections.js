let params = new URLSearchParams(document.location.search);
/* let id = params.get("id");*/

let query = document.location.search;
let bodyElm = document.body;
/* query.includes("with_cast"), query.includes("genre") */

let page = 1;
const dis_url = `https://api.themoviedb.org/3/discover/movie?${query}`
let col_id = "items-collections"
const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const det_base_url = "https://api.themoviedb.org/3/movie/"

let topic = params.get("list-topic");
console.log(topic)

let onGenres = query.includes("with_genres")
let onActors = query.includes("with_cast")
let onHighestRated = topic.includes("highest-rated")
let onNowPlaying = topic.includes("now-playing")
let onPopular = topic.includes("popular")


console.log(onGenres, onActors, onHighestRated, onNowPlaying, onPopular)

let pageTitle = "Collection";
let listTitle = ""
let listTitleModifier = "Collection"

if (onGenres) {
  topic = allGenres.find(item => item.id === Number(topic)).name
  pageTitle = "Genres"
  listTitle = `Movies tagged with '${topic}'`
}
if (onActors) {
  listTitleModifier = topicToNormal(topic)
  pageTitle = "Actors"
  listTitle = `Movies tagged with '${topic}'`
}
if (onHighestRated) {
  listTitleModifier = topicToNormal(topic)
  pageTitle = listTitleModifier
  listTitle = `All-time critically acclaimed movies`
}
if (onNowPlaying) {
  listTitleModifier = topicToNormal(topic)
  pageTitle = listTitleModifier
  listTitle = `Movies being shown in a cinema near you`
}
if (onPopular) {
  listTitleModifier = topicToNormal(topic)
  pageTitle = listTitleModifier
  listTitle = `Movies trending right now`
}

listTitleModifier = topicToNormal(topic)
document.title = `${listTitleModifier} | My Movies`;


fetchData(dis_url, insertCollectionCards)
function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'header-title': pageTitle,
    'back': "",
    'toggle': "",
  })
  headerElm.append(siteHeaderElm)

  //Main
  let mainElm = initElement("main", {
    'class': "content-main",
  })
  let listElm = initElement("card-list", {
    'section-title': listTitle,
    'id': col_id,
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
  let genreItemsElm = document.querySelector(`#${getMovieListID(col_id)}`)
  json.results.map(movie => {
    genreItemsElm.append(createMovieCard(movie, "horizontal"))
    fetchData(det_base_url + movie.id, insertRuntimes)
  })
  //fetchData(genres_url, insertGenres);
  insertGenresLocal(allGenres)
}

buildSite();


