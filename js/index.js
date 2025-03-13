let bodyElm = document.body;

const now_url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const pop_url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const hra_url = 'http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&page=1&vote_count.gte=2000'
const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const det_base_url = "https://api.themoviedb.org/3/movie/"
let now_id = "items-now-playing"
let hra_id = "items-highest-rated"
let pop_id = "items-popular"


buildSite();
fetchData(now_url, insertNowPlaying)
fetchData(hra_url, insertHighestRated)
fetchData(pop_url, insertPopular)


function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'header-title': "Home",
    'toggle': "",
  })
  headerElm.append(siteHeaderElm)

  //Main
  let mainElm = initElement("main", {
    'class': "content-main",
  })
  let nowPlayingElm = initElement("card-list", {
    'section-title': "Now Playing",
    'id': now_id,
    'horizontal': "",
    'button': ""
  })
  let highestRatedElm = initElement("card-list", {
    'section-title': "Highest Rated",
    'id': hra_id,
    'button': ""
  })
  let popularElm = initElement("card-list", {
    'section-title': "Popular",
    'id': pop_id,
    'button': ""
  })
  mainElm.append(nowPlayingElm, highestRatedElm, popularElm)

  //Footer
  let footerElm = initElement("footer")
  let navFooter = initElement("nav-footer")
  footerElm.append(navFooter)

  //Append to body
  bodyElm.append(headerElm, mainElm, footerElm);
}


function insertNowPlaying(json) {
  //Inject Now Playing
  let nowPlayingItemsElm = document.querySelector(`#${getMovieListID(now_id)}`)
  json.results.map(movie => {
    nowPlayingItemsElm.append(createMovieCard(movie))
    fetchData(det_base_url + movie.id, insertRuntimes)
  })
}

function insertHighestRated(json) {
  //Inject Highest Rated
  let highestRatedElm = document.querySelector(`#${getMovieListID(hra_id)}`)
  json.results.map(movie => {
    highestRatedElm.append(createMovieCard(movie, "horizontal"))
    fetchData(det_base_url + movie.id, insertRuntimes)
  })
}

function insertPopular(json) {
  //Inject Popular
  let popularItemsElm = document.querySelector(`#${getMovieListID(pop_id)}`)
  json.results.map(movie => {
    popularItemsElm.append(createMovieCard(movie, "horizontal"));
    fetchData(det_base_url + movie.id, insertRuntimes)
  })
  //fetchData(genres_url, insertGenres);
  insertGenresLocal(allGenres)
}

