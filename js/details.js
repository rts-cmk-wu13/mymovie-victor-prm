let params = new URLSearchParams(document.location.search);
let id = params.get("id");
//console.log(id)

let det_url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,release_dates,credits`

let bodyElm = document.body;

fetchData(det_url, insertDetails)

function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'back': "",
    'toggle': "",
  })
  headerElm.append(siteHeaderElm)

  let mainElm = initElement("main", {
    'class': "content-details"
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
  let mainElm = document.querySelector(`.content-details`)
  mainElm.append(createDetailCard(json));
  //fetchData(genres_url, insertGenres);
  insertGenresLocal(allGenres)
}