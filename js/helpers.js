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
    let movPoster = `https://image.tmdb.org/t/p/${devOrProd("w500", "original")}/${movieObj.poster_path}`;
    let movTitle = movieObj.original_title;
    let movRating = movieObj.vote_average.toFixed(1);
    let voteCount = (movieObj.vote_count / 1000).toFixed(1);

    direction = direction ? "horizontal" : "vertical"

    return `<li aria-label="${movTitle}">
                <movie-card movie-title="${movTitle}" rating="${movRating}" image-src="${movPoster}" vote-count="${voteCount}" ${direction}></movie-card>
            </li>`
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

console.log(devOrProd("Dev", "Prod: Check devOrProd-values if any errors appear"))



