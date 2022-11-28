const API_KEY = "0LfuULGGR7AG1SuLfgpY4MyCQiLkyJALLnMyHEBA";
//get loading page
const loaderContainer = document.querySelector('.loader-container');
//get modal
let modal = document.querySelector(".modal")
let movieModal = document.getElementById("list-modal");
let heartBtnHome = document.getElementById("heart-btn-home");

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
            // if (!data.title_results[0]);
            // confirm("Hmm...that might not work but feel free to roll the dice!"
            // hideLoading()

            if (!data.title_results[0]) {
            modal.style.display = "block";
            } else {
            modal.style.display = "none";
            }
            console.log ("not in db")
            let titleId = {
                id: data.title_results[0].id
            }
            localStorage.setItem("titleId", JSON.stringify(titleId));
            console.log(JSON.stringify(titleId.id));//i changed this
            titleId = JSON.stringify(titleId.id);
            // then we can fetch using the id
            idSearchLink = `https://api.watchmode.com/v1/title/${titleId}/details/?apiKey=${API_KEY}&append_to_response=sources`;
            // console.log(idSearchLink);
            fetch(idSearchLink)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    // hideLoading()
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
                                webUrl: data.sources[i].web_url,
                            }
                            console.log(searchedShow);
                            // local storage if using a lot of data
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
        // li.innerText.style.bold;
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


//defined this variable outside the function
// let weatherApiKey = "594ea481b00a6604e497673b5c4fe941";


//below function is for the weather api


function weather() {
    const apiKey = "cd449ce8a0596130f95722331fe56ab4";
    let city = 'Toronto';
    let weatherurl = "https://api.openweathermap.org/data/3.0/onecall?lat=43&lon=79&appid=" + apiKey;
    fetch(weatherurl)
        .then(function (response) {
          console.log(response);
          return response.json();
          
        })
        .then( function (data) {
            pop1 = data.daily.rain
            console.log(data.daily.rain);

    
            if (pop1 < 1) {
                document.querySelector(".weatherLine").innerText = "No rain in-sight!";
                }
            else {
                document.querySelector(".weatherLine").innerText = "Rain Today, Movie Night!";
            }
        });
  
    //the below code will ask the user if they want to allow or block the website from knowing location 
    const successCallback= (position) => {
    console.log(position);
    };
    const errorCallback= (error) => {
    console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    };

let wbtn = document.getElementById("wbtn");
let weatherbubble = document.querySelector('.weather');
let weatherClose = document.getElementById("closeWeather");


wbtn.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector('.weather').style.display = "block"
    document.querySelector('.weather').style.visibility = "visible"
    weather();
    });


weatherClose.addEventListener("click", function (event) {
        document.querySelector('.weather').style.visibility = "hidden"
})