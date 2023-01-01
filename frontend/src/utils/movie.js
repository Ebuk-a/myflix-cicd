const { user: { name }, token } = oldUser

const userName = name.split(' ')[0]
const id = location.search.split('=')[1]

const myFlixUser = document.querySelector('#user')
const moviesLink = document.querySelector('.movies-link')
const logoutBtn = document.querySelector('#btn-logout')
const video = document.getElementById('video')
const stream = document.getElementById('stream')
const streamTitleName = document.querySelector('.stream-title-name')
const movieCardWrapper = document.getElementById('movie-card-wrapper')

myFlixUser.textContent = userName

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('$myflix_user')
    location.href = 'index.html'
  })
}

moviesLink.addEventListener('click', () => {
  location.href = 'movies.html'
})

const getMovie = async () => {
  const url = `movies/get-movie?id=${id}`
  const data = {}
  const method = 'GET'

  const historyUrl = 'customer/history'
  const historyData = 'customer/history'

  try {
    const response = await api(url, data, method, token)
    let historyResponse = await api(historyUrl, historyData, method, token)
    const { name, file, thumb, _id } = response.movie

    video.setAttribute('poster', `${baseImageUrl}${thumb}`)
    video.setAttribute('src', `${baseMovieUrl}${file}`)
    streamTitleName.textContent = name

    historyResponse.history = historyResponse.history.filter(movie => movie._id !== _id)

    if (!historyResponse.history.length || !historyResponse.nbHits) {
      return movieCardWrapper.innerText = 'No recently viewed movies'
    }

    readData(historyResponse, movieCardWrapper)
  } catch (error) {
    console.log(error)
  }
}

getMovie()
