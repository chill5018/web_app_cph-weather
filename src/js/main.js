import $ from 'jquery'
  function showMenu(x) {
    x.classList.toggle("change");
  };

$(document).ready(function (){



  var apiKey = '67bc788989958cb4287dfa00937f71dc';

  navigator.geolocation.getCurrentPosition(function (position) {
    var startPos = position;
    var pos = {
      latitude: startPos.coords.latitude,
      longitude: startPos.coords.longitude
    };

    var apiLink = 'http://api.openweathermap.org/data/2.5/weather?lat='+pos.latitude+'&lon='+pos.longitude+'&units=metric&appid='+apiKey

    $.ajax({
      'url': 'http://api.openweathermap.org/data/2.5/weather',
      'type': 'GET',
      'data': {
        'lat': pos.latitude,
        'lon': pos.longitude,
        'units': 'metric',
        'appid': apiKey
      },
      // If successful we have a JSON waiting for us to use
      'success': function(data) {
        console.log(data);
        var currentLocation = data.name;
        var currentTemp = data.main.temp;
        var weather = data.weather[0].main;
        var sunrise = moment.unix(data.sys.sunrise);
        var sunset = moment.unix(data.sys.sunset);
        var sunriseNext =

        console.log(sunset);
        console.log(sunrise);
        var time_till;

       if (moment() < sunrise && moment() < sunset) {
          // Time til sunrise
          time_till = moment().to(sunrise);
          console.log(time_till);
          $('#nextEvent').text('Till Sunrise \n'+time_till);

        } else if (moment() > sunrise && moment() < sunset) {
          // time til sunset
          time_till = moment().to(sunset);
          console.log(time_till);
          $('#nextEvent').text('Till Sunset \n'+time_till);

        } else {
          // time til sunset
          time_till = moment().to(sunset);
          $('#nextEvent').text('Sunset was \n'+time_till);
        }

        // "Apply Bindings"
        $('#currentLocation').text(currentLocation);
        $('#currentTemp').text(Math.round(currentTemp));
        $('#currentWeather').append(weather);
        $('#sunrise').append(sunrise.format('HH:mm').toString());
        $('#sunset').append(sunset.format('HH:mm').toString());
        $('#currentTimeText').append(moment().format('HH:mm').toString());

        var fill              = 0;
        var id                = setInterval(frame, 24);
        var timeIndicator     = document.getElementById("currentTime");
        var currentTimeText   = document.getElementById("currentTimeText");
        var sunriseText       = document.getElementById("sunrise");
        var sunsetText        = document.getElementById("sunset");
        var daylightBar       = document.getElementById("sunBar");
        var daylight          = sunset.toObject().hours - sunrise.toObject().hours;

        daylightBar.style.marginLeft = sunrise.toObject().hours*4.16667+'%';
        sunriseText.style.marginLeft = sunrise.toObject().hours*3.16667+'%';
        sunsetText.style.marginLeft  = daylight*2.16667+'%';
        daylightBar.style.width      = daylight*4.16667 + '%';

        function frame() {
            if (fill >= moment().toObject().hours) {
                clearInterval(id);
            } else {
                fill++;
                timeIndicator.style.marginLeft = fill*4.16667 + '%';
                currentTimeText.style.marginLeft = fill*4.1 + '%';
                // console.log(fill);
            }
        }

      }
    })
  });

});
