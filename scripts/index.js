import { tweetsData } from "./data.js";
import { saveToLocalStorage, readLocalStorage, getData } from "./utils.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
let twimbaFeed = getData(tweetsData);

document.addEventListener("click", function (e) {
  if (e.target.id === "twitear-btn") {
    newTweet();
  }
  if (e.target.dataset.replies) {
    manejarRespuestas(e.target.dataset.replies);
  }
  if (e.target.dataset.likes) {
    manejarLikes(e.target.dataset.likes);
  }
  if (e.target.dataset.retweets) {
    manejarRetweets(e.target.dataset.retweets);
  }
  if (e.target.dataset.replytweet) {
    abrirReplyBloque(e.target.dataset.replytweet);
  }
  if (e.target.dataset.replybtn) {
    newReplay(e.target.dataset.replybtn);
  }
});
function newReplay(tweetUuid) {
  const textInput = document.querySelector(`#reply-input-${tweetUuid}`);
  const tweetEncontrado = twimbaFeed.find((tweet) => tweet.uuid === tweetUuid);
  tweetEncontrado.replies.unshift({
    handle: `@drkedrkedjon 💩`,
    profilePic: `imagenes/sasa.jpg`,
    tweetText: textInput.value,
  });
  tweetEncontrado.isReplyVisible = false;
  saveToLocalStorage(twimbaFeed);
  twimbaFeed = readLocalStorage();
  renderHtml();
}
function abrirReplyBloque(tweetUuid) {
  const tweetEncontrado = twimbaFeed.find((tweet) => tweet.uuid === tweetUuid);
  const replyHtml = document.querySelector(`#reply-bloque-${tweetUuid}`);

  if (tweetEncontrado.isReplyVisible) {
    replyHtml.innerHTML = "";
    tweetEncontrado.isReplyVisible = false;
  } else if (!tweetEncontrado.isReplyVisible) {
    replyHtml.innerHTML = `
      <section class="twitear reply-bloque">
        <img class="twitear-avatar avatar" src="/imagenes/sasa.jpg" alt="Avatar">
        <textarea name="twitear-input" class="twitear-input reply-input" id="reply-input-${tweetUuid}" placeholder="Responde aqui..."></textarea>
        <button data-replybtn="${tweetUuid}" class="twitear-btn reply-btn" id="reply-btn-${tweetUuid}">Reply</button>
      </section>
    `;
    tweetEncontrado.isReplyVisible = true;
  }
}
function manejarRetweets(tweetUuid) {
  const tweetEncontrado = twimbaFeed.find((tweet) => tweet.uuid === tweetUuid);
  tweetEncontrado.isRetweeted
    ? tweetEncontrado.retweets--
    : tweetEncontrado.retweets++;
  tweetEncontrado.isRetweeted = !tweetEncontrado.isRetweeted;
  renderHtml();
}
function manejarLikes(tweetUuid) {
  const tweetEncontrado = twimbaFeed.find((tweet) => tweet.uuid === tweetUuid);
  tweetEncontrado.isLiked ? tweetEncontrado.likes-- : tweetEncontrado.likes++;
  tweetEncontrado.isLiked = !tweetEncontrado.isLiked;
  renderHtml();
}
function manejarRespuestas(tweetUuid) {
  document
    .querySelector(`#tweet-replies-${tweetUuid}`)
    .classList.toggle("ocultar-respuestas");
}
function newTweet() {
  const tweetInput = document.querySelector("#twitear-input");
  if (tweetInput.value) {
    const newTweetObject = {
      handle: `@drkedrkedjon 💩`,
      profilePic: `imagenes/sasa.jpg`,
      likes: 0,
      retweets: 0,
      tweetText: `${tweetInput.value}`,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      isReplyVisible: false,
      uuid: uuidv4(),
    };
    tweetInput.value = "";
    twimbaFeed.unshift(newTweetObject);
    saveToLocalStorage(twimbaFeed);
    twimbaFeed = readLocalStorage();
    renderHtml();
  }
}
function generarHtml() {
  let html = "";
  twimbaFeed.forEach((tweet) => {
    let likesColor = "";
    if (tweet.isLiked) {
      likesColor = "red";
    }
    let retweetColor = "";
    if (tweet.isRetweeted) {
      retweetColor = "limegreen";
    }

    let replyHtml = "";
    if (tweet.replies.length > 0) {
      tweet.replies.forEach((reply) => {
        replyHtml += `
          <div class="tweet">
            <img src="${reply.profilePic}" alt="Avatar" class="avatar">
            <div class="tweet-contenido">
              <p class="tweet-usuario">${reply.handle}</p>
              <p>${reply.tweetText}</p>
            </div>
          </div>
        `;
      });
    }

    html += `
      <section class="tweet">
        <img src="${tweet.profilePic}" alt="Avatar" class="avatar">
        <div class="tweet-contenido">
          <p class="tweet-usuario">${tweet.handle}</p>
          <p>${tweet.tweetText}</p>
          <div class="tweet-interacciones">
            <span class="tweet-interaccion"><i data-replies="${tweet.uuid}" class="fa-regular fa-comment-dots"></i> ${tweet.replies.length}</span>
            <span class="tweet-interaccion"><i style="color: ${likesColor}" data-likes="${tweet.uuid}" class="icono-color fa-solid fa-heart"></i> ${tweet.likes}</span>
            <span class="tweet-interaccion"><i style="color: ${retweetColor}" data-retweets="${tweet.uuid}" class="icono-color fa-solid fa-retweet"></i> ${tweet.retweets}</span>
            <span class="tweet-interaccion"><i data-replytweet="${tweet.uuid}" class="fa-regular fa-reply"></i></span>
          </div>
          <div class="ocultar-reply-bloque" id="reply-bloque-${tweet.uuid}"></div>
          <div class="ocultar-respuestas" id="tweet-replies-${tweet.uuid}">${replyHtml}</div>
        </div>
      </section>
    `;
  });
  return html;
}
function renderHtml() {
  document.querySelector("#tweet-feed").innerHTML = generarHtml();
}
renderHtml();
