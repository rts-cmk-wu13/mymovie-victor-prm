let contentElm = document.querySelector(".content-wrapper");

const now_url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const pop_url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
let now_id = "items-now-playing"
let pop_id = "items-popular"

buildSite();
fetchList(now_url, insertNowPlaying)
fetchList(pop_url, insertPopular)

function buildSite() {
  let siteHeader = `<site-header back="unmounted" title="My Movies" toggle="true"></site-header>`;
  contentElm.insertAdjacentHTML("beforeend", siteHeader);
  let nowPlaying = `<movie-list title="Now Playing" id="${now_id}" horizontal></movie-list>`;
  contentElm.insertAdjacentHTML("beforeend", nowPlaying);
  let popular = `<movie-list title="Popular" id="${pop_id}"></movie-list>`;
  contentElm.insertAdjacentHTML("beforeend", popular);
}

function insertNowPlaying(json) {
  //Inject Now Playing
  let nowPlayingItemsElm = document.querySelector(`#${getMovieListID(now_id)}`)
  nowPlayingItemsElm.innerHTML += json.results.map(movie => createMovieCard(movie)).join("")
}

function insertPopular(json) {
  //Inject Popular
  let popularItemsElm = document.querySelector(`#${getMovieListID(pop_id)}`)
  popularItemsElm.innerHTML += json.results.map(movie => createMovieCard(movie, "horizontal")).join("")
}
