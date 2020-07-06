var cardGrid = document.getElementById("card-grid");
var progressBar = document.getElementById("progress-bar");

function createVideoCard(data) {
    var cardDiv = document.createElement("div");
    cardDiv.classList.add("playlist-card");

    var cardHyperLink = document.createElement("a");
    cardHyperLink.href = "./watch-player/player.html?vId=" + data.id;
    
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


var xhttp = new XMLHttpRequest();
xhttp.open("GET", "https://5ef2165325da2f0016227b87.mockapi.io/playlist", true);
xhttp.send();

xhttp.onreadystatechange = function () {
    progressBar.style.display = "block";
    if (xhttp.readyState === 4) {
        progressBar.style.display = "none";
        console.log(xhttp.responseText);
        var responseArr = JSON.parse(xhttp.responseText);
        for (var i = 0; i < responseArr.length; i++) {
            console.log(responseArr[i].title);

            var cardDiv = createVideoCard(responseArr[i]);
            cardGrid.appendChild(cardDiv);
        }
    }
};
