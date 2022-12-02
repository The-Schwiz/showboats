const API_KEY = "0LfuULGGR7AG1SuLfgpY4MyCQiLkyJALLnMyHEBA";
// SAVE THIS KEY! 0MKrwqaOXYN6JzTKlLZUg0qQEFEUYUmBtsxq1jEz

let loaderContainer = document.querySelector('.loader-container');
let modal = document.querySelector(".modal")
let movieModal = document.getElementById("list-modal");
let heartBtnHome = document.getElementById("heart-btn-home");
let weatherBtn = document.getElementById("wbtn");
let weatherbubble = document.querySelector('.weather');
let weatherClose = document.getElementById("closeWeather");
let weatherApiKey = "cd449ce8a0596130f95722331fe56ab4";

function closeModal() {
    modal.style.display = "none";
    hideLoading();
}

window.addEventListener('load', () => {
    loaderContainer.style.visibility = 'hidden';
});

const displayLoading = () => {
    loaderContainer.style.visibility = 'visible';
};

const hideLoading = () => {
    loaderContainer.style.visibility = 'hidden';
};

function fetchBySearchHome() {
    displayLoading()
    let searchValue = document.getElementById("search-text").value

    console.log(searchValue);
    console.log(typeof searchValue);

    let searchBarLink = `https://api.watchmode.com/v1/search/?apiKey=${API_KEY}&search_field=name&search_value=${searchValue}`

    console.log(searchBarLink);

    // then we'll fetch using the updated URL
    fetch(searchBarLink)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data.title_results[0]) {
                modal.style.display = "block";
                console.log("not in db")
            } else {
                modal.style.display = "none";
            }
            let titleId = {
                id: data.title_results[0].id
            }
            localStorage.setItem("titleId", JSON.stringify(titleId));
            console.log(JSON.stringify(titleId.id));
            titleId = JSON.stringify(titleId.id);
            // then we fetch using the id
            idSearchLink = `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${API_KEY}&append_to_response=sources`;

            fetch(idSearchLink)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    for (i = 0; i < data.sources.length; i++) {
                        if (data.sources[i].type === "sub") {
                            console.log("im working!");
                            let availableOn = (data.sources[i].name);
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
                                webUrl: data.sources[i].web_url,
                            }
                            console.log(searchedShow);
                            localStorage.setItem("searchedShow", JSON.stringify(searchedShow));
                            window.location.href = "./results.html";
                        } else {
                            modal.style.display = "block"
                        }
                    };
                });
        });
};

function fetchById() {
    let getTitleId = localStorage.getItem("titleId");
    parseTitleId = JSON.parse(getTitleId)
    let titleId = parseTitleId.id;

    // then we can fetch using the id
    idSearchLink = `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${API_KEY}&append_to_response=sources`;
    fetch(idSearchLink)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (i = 0; i < data.sources.length; i++) {
                if (data.sources[i].type === "sub") {
                    console.log("im working!");
                    let availableOn = (data.sources[i].name);
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
                    localStorage.setItem("searchedShow", JSON.stringify(searchedShow));
                    window.location.href = "./results.html";
                };
            };
        });
};

heartBtnHome.addEventListener("click", function (event) {
    event.preventDefault();
    const likedArray = localStorage.getItem("likedMovieArray");
    likedMovieList = JSON.parse(likedArray)
    for (i = 0; i < likedMovieList.length; i++) {
        console.log(likedMovieList[i][0].name)
        console.log(likedMovieList[i][0].id)
        let movie = likedMovieList[i][0].name;
        let li = document.createElement("li");
        li.textContent = movie;
        li.onclick = function () {
            console.log(movie);
            console.log(likedMovieList);
            for (i = 0; i < likedMovieList.length; i++) {
                if (movie === likedMovieList[i][0].name) {
                    console.log("yay!")
                    console.log(i);
                    console.log(likedMovieList[i][0].id);
                    let titleId = {
                        id: likedMovieList[i][0].id
                    }
                    localStorage.setItem("titleId", JSON.stringify(titleId));
                    fetchById();
                }
            }
        }
        li.setAttribute("data-index", i);
        let button = document.createElement("button");
        button.textContent = "X";
        button.setAttribute('class', 'removeBtn')
        button.onclick = function () {
            document.getElementById("liked-list").removeChild(li);
            console.log(movie);
            console.log(likedMovieList);
            for (i = 0; i < likedMovieList.length; i++) {
                if (movie === likedMovieList[i][0].name) {
                    console.log("yay!")
                    console.log(i);
                    const indexOfObject = i;
                    likedMovieList.splice(indexOfObject, 1);
                }
            }
            console.log(likedMovieList);

            localStorage.setItem("likedMovieArray", JSON.stringify(likedMovieList));
        }

        li.appendChild(button);
        document.getElementById("liked-list").appendChild(li);
        movieModal.style.display = "block";
    };
});

window.addEventListener("click", function (event) {
    if (event.target == movieModal) {
        movieModal.style.display = "none";
        let movieList = document.getElementById("liked-list");
        movieList.innerHTML = '';
    }
});

//called when user clicks "deciding on your next movie night?"
function weather() {
    //ask user if they allow or block the website from knowing location 
    const successCallback = (position) => {
        console.log(position);
        console.log(position.coords);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        //fetch within position statement
        let weatherurl = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`
        fetch(weatherurl)
            .then(function (response) {
                console.log(response);
                return response.json();
            })
            .then(function (data) {
                pop = data.daily[0].pop
                console.log(data)
                console.log(data.daily)
                console.log(pop)

                if (pop > 0.5) {
                    document.querySelector(".weatherLine").innerText = "Looks like stormy weather, batten down the hatches and watch a movie";
                    document.getElementById("closeWeather").classList.remove("hide");
                    document.getElementById("weatherIcon").classList.remove("hide");
                } else if (pop <= 0.5) {
                    // find next movie day
                    for (i = 0; i < data.daily.length; i++) {
                        if (data.daily[i].pop > 0.5) {
                            console.log(i);

                            let date = data.daily[i].dt
                            var unixFormat = dayjs.unix(date).format('MMM D, YYYY');
                            document.querySelector(".weatherLine").innerText = "Blimey! Smooth sailing ahead. The next stormy movie day is just over the horizon: " + unixFormat;
                            document.getElementById("closeWeather").classList.remove("hide");
                            document.getElementById("weatherIcon").classList.remove("hide");
                            return;
                        } else {
                            document.querySelector(".weatherLine").innerText = "Shiver me timbers! Smooth sailing ahead.";
                            document.getElementById("closeWeather").classList.remove("hide");
                            document.getElementById("weatherIcon").classList.remove("hide");
                        }
                    }
                }
            });
    };
    const errorCallback = (error) => {
        console.log(error);
        //show message to user "we dont know what the weather is in your area but it's always a good time for a movie"
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

weatherBtn.addEventListener("click", function () {
    weather();
});

weatherClose.addEventListener("click", function () {
    document.getElementById("closeWeather").classList.add("hide");
    document.getElementById("weatherIcon").classList.add("hide");
    document.querySelector(".weatherLine").innerText = "";
})

