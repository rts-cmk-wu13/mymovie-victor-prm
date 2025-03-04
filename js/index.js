let contentElm = document.querySelector(".content-wrapper");

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => {
    console.log(json)
    let siteHeader = `<site-header back="unmounted" item-title="My Movies" toggle="true"></site-header>`;
    contentElm.insertAdjacentHTML("beforeend", siteHeader);

    let nowPlaying = `<now-playing-section></now-playing-section>`;
    contentElm.insertAdjacentHTML("beforeend", nowPlaying);
    let itemsSection = document.querySelector(".now-playing-section__items-container")
    itemsSection.innerHTML += json.results.map(movie => createNPCard(movie)).join("")

  })
  .catch(err => console.error(err));

function createNPCard(movieObj) {
  let movPoster = `https://image.tmdb.org/t/p/w500/${movieObj.backdrop_path}`;
  let movTitle = movieObj.original_title;
  let movRating = movieObj.vote_average.toFixed(1)

  return `<now-playing-card item-title="${movTitle}" rating="${movRating}" image-src="${movPoster}"></now-playing-card>`
}


function getLS(key){
  return JSON.parse(localStorage.getItem(key))
}

function setLS(key,value){
  localStorage.setItem(key,JSON.stringify(value))
}
