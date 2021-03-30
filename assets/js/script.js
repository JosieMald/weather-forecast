var searchBar = $("#search-bar");
var searchTermEl = $("#search-term");
var apiKey = "d84e1509129ac5ce8200b78e8284de7b" 

$(document).ready(function(event) {
    var history = JSON.parse(localStorage.getItem("history"))||[];
    for ( var i = 0; i < history.length; i++){
        createMenuItem(history[i])
    }
    var currentDate = moment().format("L");
    console.log(currentDate);
    // var displayDate = $("<h2>").text(currentDate);
    // event.preventDefault();
    $(".searchBtn").on("click", function (){
        var searchTerm = searchTermEl.val();
        // console.log(searchTerm);
        searchWeather(searchTerm);
        history.push(searchTerm);
        console.log(history);
        localStorage.setItem("history", JSON.stringify(history))
    })
    function createMenuItem(text){
        var li = $("<li>").text(text).addClass("list-group-item");
        $(".list-group").append(li);
    }

    function searchWeather(searchTerm) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + apiKey + "&units=imperial";
    console.log(queryURL);
    $(".city-date").empty();
    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        var cityDateDisplay = data.name + " " + currentDate; // was displayDate but kept logging object 
        // console.log(cityDateDisplay);
        $(".city-date").append(cityDateDisplay);
        // console.log(data);
        // console.log(data.name);
        // console.log(data.main.temp);
        // console.log(data.main.humidity);
        // console.log(data.wind.speed);
        // console.log(data.coord.lon);
        // console.log(data.coord.lat);
        getForecast(data.coord.lat, data.coord.lon);
        // var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + {lat} + "&lon=" + {lon} + "&appid=" + apiKey
    })
}
function getForecast(lat,lon){
    var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=imperial&appid=${apiKey}`
    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        for( var i = 1; i < 6; i++){
            console.log(data.daily[i]);
            var card = $("<div>").addClass("card").attr("style", "border: 1px solid black")
            var cardBody = $("<div>").addClass("card-body");
            var cardTitle = $("<h5>").addClass("card-title").text(moment.unix(data.daily[i].dt).format("dddd"));

            $(".forecast").append(card.append(cardBody.append(cardTitle)));
        }
})
}
});


// $(".searchBtn").on("click",









// searchBar.on("click", function(event) {
//     event.preventDefault();
//     var searchTerm = searchTermEl.val();
//     console.log(searchTerm);
// });