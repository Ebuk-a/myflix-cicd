const name = document.getElementById('name')
const email = document.getElementById('email')
const password = document.getElementById('password')
const formSignUpBtn = document.getElementById('form-sign-up')
const formSignUpError = document.getElementById('form-sign-up-error')

formSignUpBtn.addEventListener('click', async (event) => {
  event.preventDefault()
  formSignUpBtn.innerHTML = 'loading...'
  
  const url = 'customer/register'
  const method = 'POST'
  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
  }

  try {
    const response = await api(url, data, method)
    localStorage.setItem('$myflix_user', JSON.stringify(response))
    location.href = 'movies.html'
  } catch (error) {
    formSignUpError.innerHTML = error.message
  } finally {
    formSignUpBtn.innerHTML = 'sign up'
  }
})