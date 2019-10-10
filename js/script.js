var movieDB = [];

function fillMovieList(movieList) {
    let movies = document.getElementById("movies");
    movies.innerHTML="";
    for (let movie of movieList) {
        printMovie(movie);
    }

}

function startPage(){
    getMovieDB();
    fillMovieList(movieDB);
    document.getElementById("sort").addEventListener("change",function(){
        fillMovieList(sortMovies());
    })
}

window.onload = startPage();
window.onunload = saveDB();


function sortMovies() {
    let sort = Number(document.getElementById("sort").value);
    let localDB = movieDB;

    switch (sort) {
        case 1:localDB.sort(function (a, b) {
            return a.title.localeCompare(b.title)
        });
        break;
        case 2:
            localDB.sort(function (b, a) {
                return a.title.localeCompare(b.title)
            });
            break;
        case 3:
            localDB.sort(function (a, b) {
                if (a.likes < b.likes) return 1;
                if (a.likes > b.likes) return -1;
                return 0;
            });
            break;
    }
    return localDB;
}


function printMovie(movie) {
    let movieCard = document.createElement("div");
    movieCard.className = "movieCard";
    movieCard.id = movie.id;

    let moviePoster = document.createElement("img");
    moviePoster.src = movie.poster;

    let text = document.createElement("div");
    text.className = "movieCardText";

    let movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.title;
    let movieDescription = document.createElement("p");
    movieDescription.textContent = movie.descibtion;

    text.appendChild(movieTitle);
    text.appendChild(movieDescription);

    /*Like Div*/
    let likeDiv = document.createElement("div");
    likeDiv.className = "likeDiv"
    likeDiv.textContent = "Like \uD83D\uDC4D";
    let likeNumber = document.createElement("div");
    movie.likes = Number(movie.likes);
    likeNumber.textContent = movie.likes;
    let iterateLike = function () {
        movie.likes++;
        likeNumber.textContent = movie.likes;
        saveDB();
    };
    likeDiv.appendChild(likeNumber);
    likeDiv.addEventListener("click", iterateLike);

    /*append to movieCard*/
    movieCard.appendChild(moviePoster);
    text.appendChild(likeDiv);
    movieCard.appendChild(text);

    /*insert into document*/
    movies.appendChild(movieCard);
}

function saveDB() {
    localStorage.setItem("movieDB", JSON.stringify(movieDB))
}

function getMovieDB() {
    if (localStorage.getItem("movieDB") == []) {
        movieDB = data;
    } else {
        movieDB = JSON.parse(localStorage.getItem("movieDB"));
    }
    localStorage.setItem("movieDB", JSON.stringify(movieDB));
}