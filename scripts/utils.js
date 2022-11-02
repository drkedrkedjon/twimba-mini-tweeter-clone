export function saveToLocalStorage(data) {
  localStorage.setItem('twimbatweet', JSON.stringify(data))
}

export function readLocalStorage() {
  return JSON.parse(localStorage.getItem('twimbatweet'))
}

export function getData(data) {
  if (localStorage.getItem('twimbatweet')) {
    // console.log('true')
    return readLocalStorage()
  } else {
    saveToLocalStorage(data)
    // console.log('false')
    return readLocalStorage()
  }
}