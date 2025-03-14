let bodyElm = document.body;

const now_url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const pop_url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const hra_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&page=1&vote_count.gte=1000'
const genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";
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
