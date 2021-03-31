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
    
    // Click Function
    $(".searchBtn").on("click", function (){
        // Stores user input 
        var searchTerm = searchTermEl.val();
        searchWeather(searchTerm);
        history.push(searchTerm);
        console.log(history);
        localStorage.setItem("history", JSON.stringify(history));
    })
    //Creates history list of previously searched cities
    function createMenuItem(text){
        var li = $("<li>").text(text).addClass("list-group-item");
        $(".list-group").append(li);
    };

    // Fecthes data from first API
    function searchWeather(searchTerm) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + apiKey + "&units=imperial";
    console.log(queryURL);
    $(".city-date").empty();
    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        var cityDateDisplay = data.name + " " + currentDate; 
        var temp = $("<p>").text("Temperature: " + data.main.temp + " °F");
        var humidity = $("<p>").text("Humidity: " + data.main.humidity + " %");
        var windSpeed = $("<p>").text("Wind Speed: " + data.wind.speed + " MPH");
        $(".city-date").append(cityDateDisplay);
        $(".temperature").append(temp);
        $(".humidity").append(humidity);
        $(".wind-speed").append(windSpeed);
        // console.log(data);
        // console.log(data.coord.lon);
        // console.log(data.coord.lat);
        getForecast(data.coord.lat, data.coord.lon);
    })
};

// Second fetch API for UV Index info and daily weather stats
function getForecast(lat,lon){
    var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=imperial&appid=${apiKey}`
    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        var uvIndex = $("<p>").text("UV Index: " + data.current.uvi);
        console.log(data.current.uvi);
        $(".uv-index").append(uvIndex);
        for( var i = 1; i < 6; i++){
            console.log(data.daily[i]);
            var card = $("<div>").addClass("card").attr("style", "border: 1px solid black");
            var cardBody = $("<div>").addClass("card-body");
            var cardTitle = $("<h5>").addClass("card-title").text(moment.unix(data.daily[i].dt).format("L"));
            var cardTemp = $("<h6>").addClass("card-temp").text("Temp: " + data.daily[i].temp.day + " °F");
            var cardHumid = $("<h6>").addClass("card-humid").text("Humidity: " + data.daily[i].humidity + " %");
            $(".forecast").append(card.append(cardBody.append(cardTitle.append(cardTemp.append(cardHumid)))));
        }
})
}
});
