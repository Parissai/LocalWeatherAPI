$(document).ready(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var longi = position.coords.longitude;
            var lati = position.coords.latitude;


            var url = 'https://fcc-weather-api.glitch.me/api/current?';

            var data = {
                units: "metric",
                'lon': longi,
                'lat': lati,
            }

            function showWeather(weatherReport) {
                $('#temperature').html(weatherReport.main.temp);

                $('#farenheit').click(function () {
                    $('#celcius').removeClass('active');
                    $('#farenheit').addClass('active');
                    $('#temperature').html((weatherReport.main.temp * 9/5 + 32).toFixed(0));
                });
                $('#celcius').click(function () {
                    $('#celcius').addClass('active');
                    $('#farenheit').removeClass('active');
                    $('#temperature').html((weatherReport.main.temp).toFixed(0));
                });

                $('#sky').attr('src', weatherReport.weather[0].icon);
                $('#sky').attr('alt', weatherReport.weather[0].description);
                $('#sky').attr('title', weatherReport.weather[0].description);

                $('#wind').html("Wind: " + weatherReport.wind.speed + " mph");
                $('#place').html(weatherReport.name +", "+ weatherReport.sys.country);

            }

            $.get(url, data, showWeather);



        });
    }
    else{
        console.log("Looks like GeoLocation is not supported.")
    }







}); //end ready