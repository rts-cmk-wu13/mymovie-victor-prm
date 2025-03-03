const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZGZhZGNjMWQyMTc5MzA4NDEzMGM0MGMzNzNjNjRhMSIsIm5iZiI6MTc0MDk4Njg2NS4yNjQsInN1YiI6IjY3YzU1OWYxZWNlMDFjZWRhMWU3NWViZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PTdzoERjMiPeJzjLrqwAMoJlhDw7Rk6g9b7YhS2F5xo'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err));