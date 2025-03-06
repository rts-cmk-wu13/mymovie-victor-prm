let bodyElm = document.body;

const now_url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const pop_url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
let now_id = "items-now-playing"
let pop_id = "items-popular"


buildSite();
fetchData(now_url, insertNowPlaying)
/* fetchData(pop_url, insertPopular) */
fetchData(genres_url, console.log)

function buildSite() {
  // Create Header
  let headerElm = document.createElement("header");
  //Populate Header
  headerElm.innerHTML = `<site-header back header-title="My Movies" toggle></site-header>`;
  bodyElm.append(headerElm);

  // Create Main
  let mainElm = document.createElement("main");
  mainElm.className = "content-main"
  //Populate Main
  let nowPlayingComp = `<movie-list section-title="Now Playing" id="${now_id}" horizontal></movie-list>`;
  mainElm.insertAdjacentHTML("beforeend", nowPlayingComp);
/*   let popularComp = `<movie-list section-title="Popular" id="${pop_id}"></movie-list>`;
  mainElm.insertAdjacentHTML("beforeend", popularComp); */

  //Create Footer
  let footerElm = document.createElement("footer");
  let footerComp = `<nav-footer></nav-footer>`
  footerElm.insertAdjacentHTML("beforeend", footerComp);
  //Append
  bodyElm.append(headerElm, mainElm, footerElm);
}

function insertNowPlaying(json) {
  //Inject Now Playing
  let nowPlayingItemsElm = document.querySelector(`#${getMovieListID(now_id)}`)
  json.results.map(movie => nowPlayingItemsElm.append(createMovieCard(movie)))
}

/* function insertPopular(json) {
  //Inject Popular
  let popularItemsElm = document.querySelector(`#${getMovieListID(pop_id)}`)
  popularItemsElm.innerHTML += json.results.map(movie => createMovieCard(movie, "horizontal")).join("")
}


 */