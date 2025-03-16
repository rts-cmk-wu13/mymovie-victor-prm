let bodyElm = document.body;

let now_id = "items-now-playing"
let hra_id = "items-highest-rated"
let pop_id = "items-popular"

buildSite();
fetchData(now_url, (data)=> insertCards(data,now_id))
fetchData(hra_url, (data)=> insertCards(data,hra_id,"horizontal"))
fetchData(pop_url, (data)=> insertCards(data,pop_id,"horizontal"))

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
  let genresElm = initElement("genre-section", {
    'section-title': "Browse genres",
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
  mainElm.append(nowPlayingElm, genresElm,highestRatedElm, popularElm)

  //Footer
  let footerElm = initElement("footer")
  let navFooter = initElement("nav-footer")
  footerElm.append(navFooter)

  //Append to body
  bodyElm.append(headerElm, mainElm, footerElm);
}
