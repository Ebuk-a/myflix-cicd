const readData = (response, movieCardWrapper) => {
  const data = response.movies || response.history

  for (const movie of data){
    const { _id, category, file, name, pic, thumb } = movie

    const movieCard = document.createElement('div')
    movieCard.setAttribute('id','movie-card')
    movieCard.setAttribute('class','movie-card')

    const cardImageContainer = document.createElement('div')
    const cardImage = document.createElement('img')
    cardImageContainer.setAttribute('class', 'card-image-container')
    cardImage.setAttribute('src', `${baseImageUrl}${thumb}`)
    cardImage.setAttribute('alt', 'img')
    cardImageContainer.appendChild(cardImage)

    const cardInfo = document.createElement('div')
    cardInfo.setAttribute('class', 'card-info')

    const title = document.createElement('p')
    title.innerText = name

    const genreCopy = document.createElement('small')
    genreCopy.innerText = 'genre: '

    const genre = document.createElement('span')
    genre.setAttribute('class', 'card-info-genre')
    genre.innerText = category

    genreCopy.appendChild(genre)

    cardInfo.append(title, genreCopy)

    movieCard.append(cardImageContainer, cardInfo)
    movieCard.addEventListener('click', () => {
      location.href = `movie.html?id=${_id}`
    })
    movieCardWrapper.appendChild(movieCard)
  }
}