var videoDiv = document.getElementById("video-div");
var videoId = window.location.search.split("=")[1];
var mainDiv = document.getElementById("main-div");
var prevDiv = document.getElementById("prev-div");


var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://5ef2165325da2f0016227b87.mockapi.io/video/" + videoId, true);
xhttp.send();

xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
        console.log(xhttp.responseText);
        var responseArr = JSON.parse(xhttp.responseText);

        console.log(responseArr.title);
        mainDiv.appendChild(createCard(responseArr));

        getCards();
        
    }
}

function getCards(){
    var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "https://5ef2165325da2f0016227b87.mockapi.io/playlist", true);
        xhttp.send();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4) {
                console.log(xhttp.responseText);
                var responseArr = JSON.parse(xhttp.responseText);
                for (var i = 0; i < responseArr.length; i++) {
                    console.log(responseArr[i].title);

                    var cardDiv = createVideoCard(responseArr[i]);
                    prevDiv.appendChild(cardDiv);
                }
            }
        };
}


function createVideoCard(data) {
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("playlist-card");

    var cardHyperLink = document.createElement("a");
    cardHyperLink.href = "./player.html?vId=" + data.id;
    
    var thumbnail = document.createElement("img");
    thumbnail.src = data.thumbnail;
    thumbnail.classList.add("thumbnail");

    var title = document.createElement("h3");
    title.innerText = data.title;
    title.classList.add("video-card-title");

    cardHyperLink.appendChild(thumbnail);
    cardHyperLink.appendChild(title);

    cardDiv.appendChild(cardHyperLink);

    return cardDiv;

}


function createCard(video) {


    var mainVideo = document.createElement("div");
    mainVideo.classList.add("main-video-div");
    mainDiv.appendChild(mainVideo);


    var videoPlay = document.createElement("div");
    videoPlay.classList.add("video-play");
    mainVideo.appendChild(videoPlay);

    var videoTag = document.createElement("iframe");
    videoTag.src = "https://player.vimeo.com/video/" + video.vimeoId;
    videoPlay.appendChild(videoTag);

    var videoTools = document.createElement("div");
    videoTools.classList.add("video-tools");
    mainVideo.appendChild(videoTools);

    var viewDiv = document.createElement("div");
    viewDiv.id = "view-div"
    var view = document.createElement("h4");
    var viewText = document.createTextNode(video.views + " " + "views");
    view.appendChild(viewText);
    viewDiv.appendChild(view);
    videoTools.appendChild(viewDiv);

    var iconDiv = document.createElement("div");
    iconDiv.id = "icon-div";
    videoTools.appendChild(iconDiv);

    var like = document.createElement("i");
    like.classList.add("far", "fa-heart");
    iconDiv.appendChild(like);

    var comment = document.createElement("i");
    comment.classList.add("far", "fa-comment-alt");
    iconDiv.appendChild(comment);

    var saved = document.createElement("i");
    saved.classList.add("far", "fa-bookmark");
    iconDiv.appendChild(saved);

    var borderDiv = document.createElement("div");
    borderDiv.classList.add("border-div");
    mainVideo.appendChild(borderDiv);

    var contentDiv = document.createElement("div");
    contentDiv.classList.add("content-div");
    mainVideo.appendChild(contentDiv);

    var title = document.createElement("h3");
    title.innerText = video.title;
    title.classList.add("video-card-title");
    contentDiv.appendChild(title);

    var desc = document.createElement("p");
    desc.innerText = video.description;
    desc.classList.add("video-card-desc");
    contentDiv.appendChild(desc);


    return mainVideo;
}
