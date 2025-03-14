let params = new URLSearchParams(document.location.search);
/* let id = params.get("id");*/
let query = document.location.search;
let bodyElm = document.body;
/* query.includes("with_cast"), query.includes("genre") */

let pageNumber = 1;
let dis_url = `https://api.themoviedb.org/3/discover/movie?${query}`
let now_url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US';
let pop_url = 'https://api.themoviedb.org/3/movie/popular?language=en-US';
let hra_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000'

let col_id = "items-collections"
let genres_url = "https://api.themoviedb.org/3/genre/movie/list?language=en";

let topic = params.get("list-topic");
console.log(topic)

let onGenres = query.includes("with_genres")
let onActors = query.includes("with_cast")
let onHighestRated = topic.includes("highest-rated")
let onNowPlaying = topic.includes("now-playing")
let onPopular = topic.includes("popular")

//console.log(onGenres, onActors, onHighestRated, onNowPlaying, onPopular)

let pageTitle = "Collection";
let listTitle = ""
let listTitleModifier = "Collection"
let currentURL = ""


if (onGenres) {
  topic = allGenres.find(item => item.id === Number(topic)).name
  pageTitle = "Genres"
  listTitle = `Movies tagged with '${topic}'`
  currentURL = dis_url;
}
if (onActors) {
  listTitleModifier = topicToNormal(topic)
  pageTitle = "Actors"
  listTitle = `Movies tagged with '${topic}'`
  currentURL = dis_url;
}
if (onHighestRated) {
  listTitleModifier = topicToNormal(topic)
  pageTitle = listTitleModifier
  listTitle = `All-time critically acclaimed movies`
  currentURL = dis_url;
}
if (onNowPlaying) {
  listTitleModifier = topicToNormal(topic)
  pageTitle = listTitleModifier
  listTitle = `Movies being shown in a cinema near you`
  currentURL = now_url;
}
if (onPopular) {
  listTitleModifier = topicToNormal(topic)
  pageTitle = listTitleModifier
  listTitle = `Movies trending right now`
  currentURL = pop_url;
}

updateList(currentURL, pageNumber);

listTitleModifier = topicToNormal(topic)
document.title = `${listTitleModifier} | My Movies`;

buildSite();

function buildSite() {
  //Header
  let headerElm = initElement("header")
  let siteHeaderElm = initElement("site-header", {
    'header-title': pageTitle,
    'back': "",
    'toggle': "",
  })
  headerElm.append(siteHeaderElm)

  //Main
  let mainElm = initElement("main", {
    'class': "content-main",
  })
  let listElm = initElement("card-list", {
    'section-title': listTitle,
    'id': col_id,
  })
  mainElm.append(listElm)

  //Footer
  let footerElm = initElement("footer")
  let navFooter = initElement("nav-footer")
  footerElm.append(navFooter)

  //Append to body
  bodyElm.append(headerElm, mainElm, footerElm);
}


let previousAmount = 0;
function infiniteScroll() {
  let targetParentElm = document.querySelector(`#card-list__${col_id}`);
  let itemsInGrid = targetParentElm.children.length
  //console.log(itemsInGrid)

  let itemThreshold = 10
  if (itemsInGrid >= itemThreshold) {
    let triggerElm = `li:nth-last-child(${itemThreshold})`;
    const targetElm = document.querySelector(triggerElm);
    //console.log(targetElm)
    //targetElm.style.backgroundColor = "red";

    const options = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver(function checkVisibility(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observer.unobserve(targetElm);
          if (previousAmount != itemsInGrid) {
            pageNumber++
            updateList(currentURL, pageNumber);
            previousAmount = itemsInGrid
          }
        }
      });
    }, options)
    observer.observe(targetElm);
  }
}


function updateList(_currentUrl, _pageNumber) {
  let url = `${_currentUrl}&page=${_pageNumber}`
  //console.log(url)
  fetchData(url, (data) => insertCards(data, col_id, "horizontal"))
  setTimeout(infiniteScroll, 1000);
}