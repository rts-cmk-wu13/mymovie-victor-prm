let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log(id)

const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
let det_url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos`


//videos, key = youtube URL, søg efter "trailer" key
let bodyElm = document.body;

/* let genre = 28;
let page = 2;
//const genre_url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&page=${page}` */

fetchData(det_url, insertDetails)

function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'header-title': "Movie Title",
    'back': "",
    'toggle': "",
  })
  headerElm.append(siteHeaderElm)

  let mainElm = initElement("main", {
    'class': "details-main"
  })

  //Footer
  let footerElm = initElement("footer")
  let navFooter = initElement("nav-footer")
  footerElm.append(navFooter)

  //Append to body
  bodyElm.append(headerElm, mainElm, footerElm);
}

buildSite();

function insertDetails(json) {
  //Inject Details
  let mainElm = document.querySelector(`.details-main`)
  mainElm.append(createDetailCard(json));
  fetchData(genres_url, insertGenres);

}