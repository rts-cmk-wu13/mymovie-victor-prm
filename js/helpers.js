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
    if (typeof tag !== "string") {
        throw new Error("initElement: 'tag' must be a valid string.");
    }

    let newElm = document.createElement(tag);

    if (attributesObj && typeof attributesObj === "object") {
        setAttributes(newElm, attributesObj);
    }

    // Attach a method to set content directly on the created element
    newElm.ihtml = function (html) {
        if (typeof html !== "undefined") {
            this.innerHTML = String(html); // Convert to string to avoid errors
        }
        return this; // Enables method chaining
    };

    return newElm; // Return the actual element
}

function getLS(key) {
    return JSON.parse(localStorage.getItem(key))
}

function setLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getMovieListID(idModifier) {
    //console.log("get", idModifier);
    return idModifier ? `card-list__${idModifier}` : ""
}

function setMovieListID(idModifier) {
    //console.log("set", idModifier);
    return idModifier ? `card-list__${idModifier}` : ""
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
        //Array.from(list).map(item => item.innerHTML = genre.name + " " + genre.emoji)
        Array.from(list).map(item => item.innerHTML = genre.name)
    })
}

function insertGenresLocal(arr) {
    arr.map(genre => {
        let list = document.querySelectorAll(`.genre-${genre.id}`);
        //Array.from(list).map(item => item.innerHTML = genre.name + " " + genre.emoji)
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
        "name": "Action",
        "emoji": "🧨"
    },
    {
        "id": 12,
        "name": "Adventure",
        "emoji": "🍿"
    },
    {
        "id": 16,
        "name": "Animation",
        "emoji": "🎨"
    },
    {
        "id": 35,
        "name": "Comedy",
        "emoji": "🤡"
    },
    {
        "id": 80,
        "name": "Crime",
        "emoji": "🚨"
    },
    {
        "id": 99,
        "name": "Documentary",
        "emoji": "📼"
    },
    {
        "id": 18,
        "name": "Drama",
        "emoji": "🎭"
    },
    {
        "id": 10751,
        "name": "Family",
        "emoji": "🧸"
    },
    {
        "id": 14,
        "name": "Fantasy",
        "emoji": "🐲"
    },
    {
        "id": 36,
        "name": "History",
        "emoji": "⏳"
    },
    {
        "id": 27,
        "name": "Horror",
        "emoji": "👹"
    },
    {
        "id": 10402,
        "name": "Music",
        "emoji": "🎸"
    },
    {
        "id": 9648,
        "name": "Mystery",
        "emoji": "🔎"
    },
    {
        "id": 10749,
        "name": "Romance",
        "emoji": "💘"
    },
    {
        "id": 878,
        "name": "Science Fiction",
        "emoji": "🤖"
    },
    {
        "id": 10770,
        "name": "TV Movie",
        "emoji": "📺"
    },
    {
        "id": 53,
        "name": "Thriller",
        "emoji": "🔪"
    },
    {
        "id": 10752,
        "name": "War",
        "emoji": "⚔️"
    },
    {
        "id": 37,
        "name": "Western",
        "emoji": "🐴"
    }
]
