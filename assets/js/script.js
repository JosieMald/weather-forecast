var searchBar = $("#search-bar");
var searchTermEl = $("#search-term");
var apiKey = "ee576a8bcd80830440ad2e16c65599ee" 

$(document).ready($(".searchBtn").on("click", function(event) {
    event.preventDefault();
    var searchTerm = searchTermEl.val();
    console.log(searchTerm);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + apiKey;
    console.log(queryURL);
    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
    })
}));












// searchBar.on("click", function(event) {
//     event.preventDefault();
//     var searchTerm = searchTermEl.val();
//     console.log(searchTerm);
// });