import { tweetsData } from "./data.js"
import { saveToLocalStorage, readLocalStorage, getData } from "./utils.js"

const twimbaFeed = getData(tweetsData)

console.log(twimbaFeed[0].handle)

