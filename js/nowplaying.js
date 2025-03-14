let bodyElm = document.body;

const now_url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const det_base_url = "https://api.themoviedb.org/3/movie/"
let now_id = "items-now-playing"


buildSite();
fetchData(now_url, insertNowPlaying)

function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'header-title': "Now Playing",
    'back': "",
    'toggle': "",
  })
  headerElm.append(siteHeaderElm)

  //Movie Cards
  let nowPlayingElm = initElement("card-list", {
    'section-title': "",
    'id': now_id,
  })

  //Footer
  let footerElm = initElement("footer")
  let navFooter = initElement("nav-footer")
  footerElm.append(navFooter)

  //Append to body
  bodyElm.append(headerElm, nowPlayingElm, footerElm);
}

function insertNowPlaying(json) {
  //Inject Now Playing
  let nowPlayingItemsElm = document.querySelector(`#${getMovieListID(now_id)}`)
  json.results.map(movie => {
    nowPlayingItemsElm.append(createMovieCard(movie, "horizontal"))
    fetchData(det_base_url + movie.id, insertRuntimes)
  })
  insertGenresLocal(allGenres)
}