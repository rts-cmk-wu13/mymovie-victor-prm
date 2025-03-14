let bodyElm = document.body;

const pop_url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const det_base_url = "https://api.themoviedb.org/3/movie/";
let pop_id = "items-popular"

buildSite();
fetchData(pop_url, insertPopular)

function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'header-title': "Popular",
    'back': "",
    'toggle': "",
  })
  headerElm.append(siteHeaderElm)

  //Movie Cards
  let popularElm = initElement("card-list", {
    'section-title': "",
    'id': pop_id,
  })

  //Footer
  let footerElm = initElement("footer")
  let navFooter = initElement("nav-footer")
  footerElm.append(navFooter)

  //Append to body
  bodyElm.append(headerElm, popularElm, footerElm);
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