let params = new URLSearchParams(document.location.search);
let id = params.get("id");
console.log(id)


//videos, key = youtube URL, søg efter "trailer" key
let bodyElm = document.body;

const det_url = 'https://api.themoviedb.org/3/movie/1064213?append_to_response=videos&language=en-US';

let genre = 28;
let page = 2;
const genre_url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&page=${page}`

fetchData(genre_url, console.log)

function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'header-title': "Movie Title",
    'back': "",
    'toggle': "",
  })
  headerElm.append(siteHeaderElm)

  //Footer
  let footerElm = initElement("footer")
  let navFooter = initElement("nav-footer")
  footerElm.append(navFooter)

  //Append to body
  bodyElm.append(headerElm, footerElm);
}

buildSite();