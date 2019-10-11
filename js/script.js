var movieDB = [];

function printMovieDetails(id){
    let movies = document.getElementById("movieDetails");
    let movie;
    for(let element of movieDB ){
        if(element.id == id){
            movie = element;
        }
    }
    movies.innerHTML="";
    printMovie(movie,movies);
}

function fillMovieList(movieList) {
    let movies = document.getElementById("movies");
    movies.innerHTML="";
    for (let movie of movieList) {
        printMovie(movie, movies);
    }

}

function startPage(){
    getMovieDB();
    fillMovieList(sortMovies());
    document.getElementById("sort").addEventListener("change",function(){
        fillMovieList(sortMovies());
    })
}

window.onload = startPage();
window.onunload = saveDB();
document.getElementById("movieDetails").addEventListener("click", function(){
    document.getElementById("movieDetails").style.display = "none";
})
document.getElementById("add").addEventListener("click", function(){
    document.getElementById("newMovie").style.display = "block";
})
document.getElementById("insertButton").addEventListener("click", function(){
    addMovie();
    document.getElementById("newMovie").style.display = "none"
})


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
        case 4:localDB.sort(function (b, a) {
            if (a.id < b.id) return 1;
            if (a.id > b.id) return -1;
            return 0;
        });
        break;
        case 5:localDB.sort(function (a, b) {
            if (a.id < b.id) return 1;
            if (a.id > b.id) return -1;
            return 0;
        });
        break;
    }
    return localDB;
}


function printMovie(movie, movies) {
    let movieCard = document.createElement("div");
    movieCard.className = "movieCard";
    movieCard.id = movie.id;

    let addMovieDetail = function(){
        printMovieDetails(movieCard.id);
    }

    let moviePoster = document.createElement("img");
    moviePoster.src = movie.poster;
    moviePoster.addEventListener("click", addMovieDetail);

    let text = document.createElement("div");
    text.className = "movieCardText";

    let movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.title;
    movieTitle.addEventListener("click", addMovieDetail);
    let movieDescription = document.createElement("p");
    movieDescription.textContent = movie.descibtion;

    text.appendChild(movieTitle);
    text.appendChild(movieDescription);
    if(movies.id == "movieDetails"){
        let longDescription = document.createElement("p");
        longDescription.textContent = movie.longDescribtion;
        text.appendChild(longDescription);
        movies.style.display = "block";
    }

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
    let local;
    try{
    local = localStorage.getItem("movieDB");
    } catch{
    local = null;
    }
    if (local == "null"||local == null) {
        movieDB = data;
    } else {
        movieDB = JSON.parse(localStorage.getItem("movieDB"));
    }
    localStorage.setItem("movieDB", JSON.stringify(movieDB));
}

function addMovieToDB(){
    let title = document.getElementById("newTitle").value;
    let descibtion = document.getElementById("shortDes").value;
    let genre = document.getElementById("genre").value;
    let poster = document.getElementById("posterLink").value;
    let longDescribtion = document.getElementById("longDes").value;

    let newMovie = new Movie(title,descibtion,genre,poster,longDescribtion);
    newMovie.id = movieDB.length;
    movieDB.push(newMovie);
}

function addMovie(){
    addMovieToDB();
    fillMovieList(sortMovies());
    saveDB();
}

class Movie{
    constructor(title,descibtion,genre,poster,longDescribtion){
        this.title = title;
        this.descibtion = descibtion;
        this.genre = genre;
        this.poster = poster;
        this.longDescribtion = longDescribtion;
        this.viewed = false;
        this.views = 0;
        this.likes = 0;
        this.id = 0;
    }
}