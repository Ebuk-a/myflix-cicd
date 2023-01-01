const { user: { name }, token } = oldUser
const userName = name.split(' ')[0]

const logoutBtn = document.querySelector('#btn-logout')
const myFlixUser = document.querySelector('#user')
const movieCardWrapper = document.getElementById('movie-card-wrapper')
const selectCategory = document.getElementById('select-category')

let allMovies = []

myFlixUser.textContent = userName

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('$myflix_user')
    location.href = 'index.html'
  })
}

const getMovies = async () => {
  const url = 'movies'
  const data = {}
  const method = 'GET'


  try {
    const response = await api(url, data, method, token)
    if (!response.nbHits) {
      selectCategory.style.display = 'none'
      return movieCardWrapper.innerText = 'No movies to display at the moment.'
    }

    allMovies = response
    readData(response, movieCardWrapper)
  } catch (error) {
    console.log(error)
  }
}

selectCategory.addEventListener('change', (event) => {
  const { value } = event.target
  const { movies } = allMovies

  const filteredMovies = movies.filter(movie => movie.category === value)
  const newResponse = filteredMovies.length ? { movies: filteredMovies } : allMovies
  
  movieCardWrapper.innerHTML = null
  readData(newResponse, movieCardWrapper)
})

getMovies()
