window.onload = () => {
  getOriginals()
  getTrendingNow()
  getTopRated()
  getActionMovies()
  getAdventureMovies()
  getAnimationMovies()
  getThrillerMovies()
  getScienceFictionMovies()
  getCrimeMovies()
  getComedyMovies()
  getDocumentaryMovies()
}

// fetchMovies('https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1', 'top_rated', 'backdrop_path')
function fetchMovies(url, dom_element, path_type) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('something went wrong')
      }
    })
    .then(data => {
      showMovies(data, dom_element, path_type)
    })
    .catch(error_data => {
      console.log(error_data)
    })
}

// Function that displays the movies to the DOM
showMovies = (movies, dom_element, path_type) => {

  var moviesEl = document.querySelector(dom_element)

  for (var movie of movies.results) {
    var imageElement = document.createElement('img')

    imageElement.setAttribute('data-id', movie.id)

    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`

    imageElement.addEventListener('click', e => {
      handleMovieSelection(e)
    })
    moviesEl.appendChild(imageElement)
  }
}

// ** Function that fetches Netflix Originals **
function getOriginals() {
  var url =
    'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213&page=1&language=en-US'
  fetchMovies(url, '.original__movies', 'poster_path')
}

// ** Function that fetches Trending Movies **
function getTrendingNow() {
  var url =
    'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045&page=1&language=en-US'
  fetchMovies(url, '#trending', 'backdrop_path')
}

// ** Function that fetches Top Rated Movies **
function getTopRated() {
  var url =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
  fetchMovies(url, '#top_rated', 'backdrop_path')
}

// ** Function that fetches Action Movies **
function getActionMovies() {
  var url =
    'https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=28'
  fetchMovies(url, '#action', 'backdrop_path')
}

// ** Function that fetches Adventure Movies **
function getAdventureMovies() {
  var url =
    'https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=12'
  fetchMovies(url, '#adventure', 'backdrop_path')
}

// ** Function that fetches Animation Movies **
function getAnimationMovies() {
  var url =
    'https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=16'
  fetchMovies(url, '#animation', 'backdrop_path')
}

// ** Function that fetches Thriller Movies **
function getThrillerMovies() {
  var url =
    'https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=53'
  fetchMovies(url, '#thriller', 'backdrop_path')
}

// ** Function that fetches Science Fiction Movies **
function getScienceFictionMovies() {
  var url =
    'https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=878'
  fetchMovies(url, '#science_fiction', 'backdrop_path')
}

// ** Function that fetches Crime Movies **
function getCrimeMovies() {
  var url =
    'https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=80'
  fetchMovies(url, '#crime', 'backdrop_path')
}

// ** Function that fetches Comedy Movies **
function getComedyMovies() {
  var url =
    'https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=35'
  fetchMovies(url, '#comedy', 'backdrop_path')
}

// ** Function that fetches Documentary Movies **
function getDocumentaryMovies() {
  var url =
    'https://api.themoviedb.org/3/discover/movie?api_key=19f84e11932abbc79e6d83f82d6d1045&with_genres=99'
  fetchMovies(url, '#documentary', 'backdrop_path')
}

// ** Get Movies Trailers **

async function getMovieTrailer(id) {
  var url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1`
  return await fetch(url).then(response => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Something went wrong!')
    }
  })
}

const setTrailer = trailers => {
  const iframe = document.getElementById('movieTrailer')
  const movieNotFound = document.querySelector('.movieNotFound')
  if (trailers.length > 0) {
    movieNotFound.classList.add('d-none')
    iframe.classList.remove('d-none')
    iframe.src = `https://www.youtube.com/embed/${trailers[0].key}`
  } else {
    iframe.classList.add('d-none')
    movieNotFound.classList.remove('d-none')
  }
}

const handleMovieSelection = e => {
  const id = e.target.getAttribute('data-id')
  const iframe = document.getElementById('movieTrailer')
  getMovieTrailer(id).then(data => {
    const results = data.results
    const youtubeTrailers = results.filter(result => {
      if (result.site == 'YouTube' && result.type == 'Trailer') {
        return true
      } else {
        return false
      }
    })
    setTrailer(youtubeTrailers)
  })

  $('#trailerModal').modal('show')
}

const displayMsg = () => {
  alert("This feature will be added soon")
}
  
