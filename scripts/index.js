import { tweetsData } from "./data.js"
import { saveToLocalStorage, readLocalStorage, getData } from "./utils.js"

const twimbaFeed = getData(tweetsData)

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
            <span class="tweet-interaccion"><i class="fa-regular fa-comment-dots"></i> 2</span>
            <span class="tweet-interaccion"><i class="fa-solid fa-heart"></i> 27</span>
            <span class="tweet-interaccion"><i class="fa-solid fa-retweet"></i> 10</span>
            <span class="tweet-interaccion"><i class="fa-regular fa-reply"></i></span>
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
