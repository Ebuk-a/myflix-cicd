const baseUrl = 'http://localhost:4000/api/v1'
const baseImageUrl = 'https://storage.googleapis.com/devops_movie_bucket/image_uploads/'
const baseMovieUrl = 'https://storage.googleapis.com/devops_movie_bucket/movie_uploads/'

const api = async (url, data = {}, method = '', token = '') => {
  const options = {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }

  if (method === 'GET') {
    delete options.body
  }

  try {
    const response = await fetch(`${baseUrl}/${url}`, options)

    if (!response.ok) {
      const errorResponse = await response.json()
      throw new Error(errorResponse.msg)
    }

    const responseData = await response.json()
    return responseData

  } catch (error) {
    throw error
  }
}