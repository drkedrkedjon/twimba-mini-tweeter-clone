import { tweetsData } from "./data.js"
import { saveToLocalStorage, readLocalStorage, getData } from "./utils.js"
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
let twimbaFeed = getData(tweetsData)

document.addEventListener('click', function(e) {

  if (e.target.id === 'twitear-btn') {
    newTweet()
  }
  if (e.target.dataset.replies) {
    console.log(e.target.dataset.replies)
  }


})

function newTweet() {
  const tweetInput = document.querySelector('#twitear-input')
  if (tweetInput.value) {
    const newTweetObject = {
      handle: `@drkedrkedjon 💩`,
      profilePic: `/imagenes/sasa.jpg`,
      likes: 0,
      retweets: 0,
      tweetText: `${tweetInput.value}`,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    }
    tweetInput.value = ''
    twimbaFeed.unshift(newTweetObject)
    saveToLocalStorage(twimbaFeed)
    twimbaFeed = readLocalStorage()
    renderHtml()
  }
}

function generarHtml() {
  let html = ''
  twimbaFeed.forEach( tweet => {
    let replyHtml = ''

    if (tweet.replies.length > 0) {
      tweet.replies.forEach( reply => {
        replyHtml += `
          <div class="tweet-replies">
            <div class="tweet">
              <img src="${reply.profilePic}" alt="Avatar" class="avatar">
              <div class="tweet-contenido">
                <p class="tweet-usuario">${reply.handle}</p>
                <p>${reply.tweetText}</p>
              </div>
            </div>
          </div>
        `
      })
    }

    html += `
      <section class="tweet">
        <img src="${tweet.profilePic}" alt="Avatar" class="avatar">
        <div class="tweet-contenido">
          <p class="tweet-usuario">${tweet.handle}</p>
          <p>${tweet.tweetText}</p>
          <div class="tweet-interacciones">
            <span class="tweet-interaccion"><i data-replies="${tweet.uuid}" class="fa-regular fa-comment-dots"></i> ${tweet.replies.length}</span>
            <span class="tweet-interaccion"><i data-likes="${tweet.uuid}" class="fa-solid fa-heart"></i> ${tweet.likes}</span>
            <span class="tweet-interaccion"><i data-retweets="${tweet.uuid}" class="fa-solid fa-retweet"></i> ${tweet.retweets}</span>
            <span class="tweet-interaccion"><i data-reply-tweet="${tweet.uuid}" class="fa-regular fa-reply"></i></span>
          </div>
            ${replyHtml}
        </div>
      </section>
    `
  });
  return html
}


function renderHtml() {
  document.querySelector('#tweet-feed').innerHTML = generarHtml()
}
renderHtml()
