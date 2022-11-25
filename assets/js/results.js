const API_KEY = "BMsHZZbTMsqyA81lIBU7ZV2BMz5etHb49U7mfPH3";

let showTitle = document.getElementById("titleId");
let showPoster = document.getElementById("show-poster");
let showLink = document.getElementById("show-link");
let showGenres = document.getElementById("genresId");
let showDuration = document.getElementById("durationId");
let showReleaseDate = document.getElementById("releaseDateId");
let showSimilarTitles = document.getElementById("recommended");
let showUserRating = document.getElementById("userRatingId");
let showCriticScore = document.getElementById("criticsScoreId");
let showAvaileableOn = document.getElementById("availableOnId")
let showType = document.getElementById("typeId");
let similarTitle0 = document.getElementById("similarTitle0");
let similarTitle1 = document.getElementById("similarTitle1");
let similarTitle2 = document.getElementById("similarTitle2");
let similarTitle3 = document.getElementById("similarTitle3");

const loaderContainer = document.querySelector('.loader-container');

window.addEventListener('load', () => {
    loaderContainer.style.display = 'none';
});

// const displayLoading = () => {
//     loaderContainer.display = 'block';
// };

// const hideLoading = () => {
//     loaderContainer.style.display = 'none';
// };

function resultsPage() {
    // on load of second html, get object from local storage
    const showDetails = localStorage.getItem("searchedShow");
    show = JSON.parse(showDetails)

    showTitle.textContent = "Title: " + (show.title);
    showAvaileableOn.textContent = "Available on: " + (show.findOn);
    showReleaseDate.textContent = "Release date: " + (show.releaseDate);
    showUserRating.textContent = "User Rating: " + (show.userRating);
    showCriticScore.textContent = "Critics Score: " + (show.criticScore);
    showDuration.textContent = "Duration: " + (show.runtime);
    showGenres.textContent = "Genre(s): " + (show.genres);
    showType.textContent = "Type: " + (show.type);
    showPoster.setAttribute('src', (show.poster));
    showLink.setAttribute('href', (show.webUrl));

    // for this, we'll need to fetch the IDs and use those IDs to get the poster
    idSearchLink0 = `https://api.watchmode.com/v1/title/` + (show.similarTitles[0]) + `/details/?apiKey=${API_KEY}&append_to_response=sources`;
    fetch(idSearchLink0)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            similarTitle0.setAttribute('src', (data.poster));
        });
    idSearchLink1 = `https://api.watchmode.com/v1/title/` + (show.similarTitles[1]) + `/details/?apiKey=${API_KEY}&append_to_response=sources`;
    fetch(idSearchLink1)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            similarTitle1.setAttribute('src', (data.poster));
        });
    idSearchLink2 = `https://api.watchmode.com/v1/title/` + (show.similarTitles[2]) + `/details/?apiKey=${API_KEY}&append_to_response=sources`;
    fetch(idSearchLink2)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            similarTitle2.setAttribute('src', (data.poster));
        });
    idSearchLink3 = `https://api.watchmode.com/v1/title/` + (show.similarTitles[3]) + `/details/?apiKey=${API_KEY}&append_to_response=sources`;
    fetch(idSearchLink3)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            similarTitle3.setAttribute('src', (data.poster));
        });
};

resultsPage();


function fetchById() {
    let getTitleId = localStorage.getItem("titleId");
    parseTitleId = JSON.parse(getTitleId)
    let titleId = parseTitleId.id;
    console.log(titleId);
    // then we can fetch using the id
    idSearchLink = `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${API_KEY}&append_to_response=sources`;
    // console.log(idSearchLink);
    fetch(idSearchLink)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (i = 0; i < data.sources.length; i++) {
                if (data.sources[i].type === "sub") {
                    console.log("im working!");
                    let availableOn = (data.sources[i].name);
                    // availableOn.textContent = (data.sources[i].name);
                    console.log(availableOn);
                    // create an object and store inside local storage
                    let searchedShow = {
                        title: data.title,
                        poster: data.poster,
                        genres: data.genre_names,
                        runtime: data.runtime_minutes,
                        releaseDate: data.release_date,
                        similarTitles: data.similar_titles,
                        userRating: data.user_rating,
                        criticScore: data.critic_score,
                        findOn: availableOn,
                        type: data.type,
                        webUrl: data.sources[i].web_url
                    }
                    console.log(searchedShow);
                    // local storage if using a lot of data
                    localStorage.setItem("searchedShow", JSON.stringify(searchedShow));
                    resultsPage();
                };
            };

        });
};

function storeId0() {
    getId = localStorage.getItem("searchedShow");
    clickedId = JSON.parse(getId)
    console.log(clickedId.similarTitles[0]);
    let titleId = {
        id: clickedId.similarTitles[0]
    }
    localStorage.setItem("titleId", JSON.stringify(titleId));
    fetchById();
};

function storeId1() {
    getId = localStorage.getItem("searchedShow");
    clickedId = JSON.parse(getId)
    console.log(clickedId.similarTitles[1]);
    let titleId = {
        id: clickedId.similarTitles[1]
    }
    localStorage.setItem("titleId", JSON.stringify(titleId));
    fetchById();
};

function storeId2() {
    getId = localStorage.getItem("searchedShow");
    clickedId = JSON.parse(getId)
    console.log(clickedId.similarTitles[2]);
    let titleId = {
        id: clickedId.similarTitles[2]
    }
    localStorage.setItem("titleId", JSON.stringify(titleId));
    fetchById();
};

function storeId3() {
    getId = localStorage.getItem("searchedShow");
    clickedId = JSON.parse(getId)
    console.log(clickedId.similarTitles[3]);
    let titleId = {
        id: clickedId.similarTitles[3]
    }
    localStorage.setItem("titleId", JSON.stringify(titleId));
    fetchById();
};