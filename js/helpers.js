function fetchList(url, callBack) {
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
            return callBack(json);
        })
        .catch(err => console.error(err));
}

function createNPCard(movieObj) {
    let movPoster = `https://image.tmdb.org/t/p/w500/${movieObj.backdrop_path}`;
    let movTitle = movieObj.original_title;
    let movRating = movieObj.vote_average.toFixed(1)

    return `<now-playing-card movie-title="${movTitle}" rating="${movRating}" image-src="${movPoster}"></now-playing-card>`
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
