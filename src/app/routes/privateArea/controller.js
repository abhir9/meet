'use strict'

function privateAreaController ($scope, $routeParams,$rootScope,StorageService, $location, dataService, AuthService) {
  const modal = document.getElementById('info-modal')
  const addOption = document.getElementById('addOption')

  let optionNumber = 3
  $scope.userID = JSON.parse(StorageService.get('userData')).id;
  $scope.isUserRole =JSON.parse(StorageService.get('userData')).role=='user';


  addOption.onclick = function () {
    let optionInput = `<div class="input-field col s8">
                          <input class="input-border-color" id="option${optionNumber}" type="text" name="option${optionNumber}">
                          <label for="option${optionNumber}">Option ${optionNumber}</label>
                      </div>`
    const element = document.getElementsByClassName('input-field')[optionNumber - 1]
    element.insertAdjacentHTML('afterend', optionInput)
    optionNumber++
  }

  $scope.updateStatus = (statusData) => {
    const status = statusData.pollInfo.status
    const id = statusData._id
    dataService.updateStatus(id, status)
      .then(console.log)
      .catch(console.log)
  }

  $scope.deletePoll = ($event) => {
    const pollIdToDelete = $event.currentTarget.parentNode.getAttribute('id')
    $event.currentTarget.parentNode.remove()
    dataService.deletePoll(pollIdToDelete)
      .then(console.log)
      .catch(console.log)
  }

  $scope.logout = () => {
    AuthService.logout()
    $location.path('/')
  }

  /* -------- LOAD USER POLLS API -------- */

  dataService.getUserPolls($scope.userID)
    .then((response) => {
      $scope.polls = response.data
    })
    .catch(console.log)
}

module.exports = privateAreaController
