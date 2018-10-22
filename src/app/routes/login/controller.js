/* global Materialize */

'use strict'

function  loginController (AuthService, $location,StorageService) {
// consoe.log($localStorage);
  this.login = (e) => {
    e.preventDefault()
    AuthService.login(this.email, this.password)
      .then(data => {
console.log(data);
if (data.success) {
          Materialize.toast('Succesfully logged!', 2000)
    StorageService.set('userData',JSON.stringify(data))
          $location.path('/user')
        }
      })
      .catch(() => Materialize.toast('Try again!', 2000))
  }
}

module.exports = loginController
