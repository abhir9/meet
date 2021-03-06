/* global $ */

const run = ($rootScope, $location, StorageService, AuthService) => {
  if (AuthService.isLoggedIn()) {
    const token = StorageService.get('token')
    AuthService.setCredentials(token)
  }
  else {
    $location.path('/login')
  }

  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    $(document).ready(function () {
      setTimeout(() => {
        $('.button-collapse').sideNav()
      }, 500)
    })
    if (next && next.secure) {
      if (!AuthService.isLoggedIn()) {
        $location.path('/login')
      }
    }
  })
}

module.exports = run
