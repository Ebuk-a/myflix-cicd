const user = JSON.parse(localStorage.getItem('$myflix_user'))

if (user && user.token) {
  location.href = 'movies.html'
}


const logo = document.getElementById('logo')
const loginBtn = document.querySelector('#btn-login')
const signUpBtn = document.querySelector('#btn-sign-up')

logo.addEventListener('click', () => {
  location.href = 'index.html'
})

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    location.href = 'login.html'
  })
}

if (signUpBtn) {
  signUpBtn.addEventListener('click', () => {
    location.href = 'signup.html'
  })
}
