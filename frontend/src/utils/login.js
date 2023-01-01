const email = document.getElementById('email')
const password = document.getElementById('password')
const formLoginBtn = document.getElementById('form-login')
const formLoginError = document.getElementById('form-login-error')

formLoginBtn.addEventListener('click', async (event) => {
  event.preventDefault()
  formLoginBtn.innerHTML = 'loading...'
  
  const url = 'customer/login'
  const method = 'POST'
  const data = {
    email: email.value,
    password: password.value,
  }

  try {
    const response = await api(url, data, method)
    localStorage.setItem('$myflix_user', JSON.stringify(response))
    location.href = 'movies.html'
  } catch (error) {
    formLoginError.innerHTML = error.message
  } finally {
    formLoginBtn.innerHTML = 'sign up'
  }
})