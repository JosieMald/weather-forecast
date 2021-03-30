var searchBar = $("#search-bar");
var searchTermEl = $("#search-term");
var apiKey = "d84e1509129ac5ce8200b78e8284de7b" 

$(document).ready($(".searchBtn").on("click", function(event) {
    event.preventDefault();
    var searchTerm = searchTermEl.val();
    console.log(searchTerm);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + apiKey + "&units=imperial";
    console.log(queryURL);
    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        console.log(data.name);
        console.log(data.main.temp);
        console.log(data.main.humidity);
        console.log(data.wind.speed);
        console.log(data.coord.lon);
        console.log(data.coord.lat);
        var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + {lat} + "&lon=" + {lon} + "&appid=" + apiKey
    })
}));












// searchBar.on("click", function(event) {
//     event.preventDefault();
//     var searchTerm = searchTermEl.val();
//     console.log(searchTerm);
// });