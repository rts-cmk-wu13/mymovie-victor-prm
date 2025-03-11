let imageBasePath = "https://image.tmdb.org/t/p/";

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
            //console.log(json)
            if (!callBack) return
            return callBack(json);
        })
        .catch(err => console.error(err));
}


function createMovieCard(movieObj, direction) {
    //let itemID = `movie-card__${movieObj.id}`
    let itemDirection = direction ? "horizontal" : "vertical"


    let item = document.createElement("li");
    item.ariaLabel = movieObj.original_title;

    //Create movie-card properly
    const movieCard = initElement("movie-card", {
        [itemDirection]: "",
    });

    //Append it to the li
    item.appendChild(movieCard);

    //Assign data directly to movie card
    movieCard.dataObject = movieObj;
    return item;
}

function createDetailCard(movieObj) {
    //Create detail-card
    const detailCard = initElement("detail-card");

    //Assign data directly to movie card
    detailCard.dataObject = movieObj;
    return detailCard;
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

function checkOriginalTitle(json) {
    //console.log(json)
    let originalTitle = json.original_language != "en" ? ` <span class="movie__original-title">${json.original_title}</span>` : "";
    return originalTitle;
}

function insertRuntimes(json) {
    let movieRuntime = convertMinsToHrsMins(json.runtime)
    let movieID = `#movie-card--${json.id}`
    let runtimeElms = document.querySelectorAll(movieID + " .movie-card__runtime-length")
    runtimeElms.forEach(runtimeElm => runtimeElm.innerHTML = movieRuntime)
}

function convertMinsToHrsMins(mins) {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    //h = h < 10 ? '0' + h : h; // (or alternatively) h = String(h).padStart(2, '0')
    m = m < 10 ? '0' + m : m; // (or alternatively) m = String(m).padStart(2, '0')
    return `${h}h ${m}m`;
}

console.log(devOrProd("Dev", "Prod: Check devOrProd-values if any errors appear"))

let allGenres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }

]
