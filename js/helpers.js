function fetchData(url, callBack) {
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
            if (!callBack) return
            return callBack(json);
        })
        .catch(err => console.error(err));
}


function createMovieCard(movieObj, direction) {
    //let itemID = `movie-card__${movieObj.id}`
    let itemDirection = direction ? "horizontal" : "vertical"


    let item = document.createElement("li");
    item.ariaLabel = "movTitle";

    //Create movie-card properly
    const movieCard = document.createElement("movie-card");
    //Append it to the li
    item.appendChild(movieCard);

    setAttributes(movieCard, {
        [itemDirection]: "",
    })
    //Assign data directly to movie card
    movieCard.dataObject = movieObj;
    return item;
}

function initElement(tag, attributesObj) {
    let newElm = document.createElement(tag);
    if (attributesObj) setAttributes(newElm, attributesObj);
    //console.log(tag,attributesObj);
    return newElm;
}

function getLS(key) {
    return JSON.parse(localStorage.getItem(key))
}

function setLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getMovieListID(idModifier) {
    //console.log("get", idModifier);
    return idModifier ? `movie-list__${idModifier}` : ""
}

function setMovieListID(idModifier) {
    //console.log("set", idModifier);
    return idModifier ? `movie-list__${idModifier}` : ""
}

function checkLayoutDirection(thisElm) {
    let isHorizontal = thisElm.hasAttribute("horizontal");
    return isHorizontal ? "horizontal" : "vertical"
}

function devOrProd(devValue, prodValue) {
    ;
    let location = window.location.origin
    let isDev = location.startsWith("http://127.0.0.1");
    return isDev ? devValue : prodValue
}

function setAttributes(el, attrs) {
    Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
}

function insertGenres(json) {
    json.genres.map(genre => {
      let list = document.querySelectorAll(`.genre-${genre.id}`);
      Array.from(list).map(item => item.innerHTML = genre.name)
    })
  }

console.log(devOrProd("Dev", "Prod: Check devOrProd-values if any errors appear"))



