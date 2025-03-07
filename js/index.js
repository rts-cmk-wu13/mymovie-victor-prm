let bodyElm = document.body;

const now_url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const pop_url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
let now_id = "items-now-playing"
let pop_id = "items-popular"


buildSite();
fetchData(now_url, insertNowPlaying)
fetchData(pop_url, insertPopular)
//fetchData(genres_url, console.log)

function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'class': "site-header",
    'aria-label': "header",
    'header-title': "Home",
    'back': "",
    'toggle': "",
  })
  headerElm.append(siteHeaderElm)

  //Main
  let mainElm = initElement("main", {
    'class': "main-content",
  })
  let nowPlayingElm = initElement("movie-list", {
    'section-title': "Now Playing",
    'id': now_id,
    'horizontal': "",
  })
  let popularElm = initElement("movie-list", {
    'section-title': "Popular",
    'id': pop_id,
  })
  mainElm.append(nowPlayingElm, popularElm)

  //Footer
  let footerElm = initElement("footer")
  let navFooter = initElement("nav-footer", {
    'class': "site-footer",
    'aria-label': "navigation footer"
  })
  footerElm.append(navFooter)

  //Append to body
  bodyElm.append(headerElm, mainElm, footerElm);
}

function initElement(tag, attributesObj) {
  let newElm = document.createElement(tag);
  if (attributesObj) setAttributes(newElm, attributesObj);
  //console.log(tag,attributesObj);
  return newElm;
}

function insertNowPlaying(json) {
  //Inject Now Playing
  let nowPlayingItemsElm = document.querySelector(`#${getMovieListID(now_id)}`)
  json.results.map(movie => nowPlayingItemsElm.append(createMovieCard(movie)))
}

function insertPopular(json) {
  //Inject Popular
  let popularItemsElm = document.querySelector(`#${getMovieListID(pop_id)}`)
  json.results.map(movie => popularItemsElm.append(createMovieCard(movie, "horizontal")))
}

function insertGenres(){
  
}
