'use strict'
const StorageService = ($window) => {
  const set = (key,value) => {
    $window.localStorage.setItem(key,value)
  }

  const get = (key) => {
    return $window.localStorage.getItem(key)
  }

  const clear = () => {
    $window.localStorage.clear();
  }

  return { set, get, clear }
}

module.exports = StorageService
