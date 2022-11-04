export function saveToLocalStorage(data) {
  localStorage.setItem('twimbatweet', JSON.stringify(data))
}

export function readLocalStorage() {
  return JSON.parse(localStorage.getItem('twimbatweet'))
}

export function getData(data) {
  if (localStorage.getItem('twimbatweet')) {
    return readLocalStorage()
  } else {
    saveToLocalStorage(data)
    return readLocalStorage()
  }
}