const oldUser = JSON.parse(localStorage.getItem('$myflix_user'))

if (!(oldUser && oldUser.token)) {
  location.href = 'index.html'
}