
var currentConditionText;

// Fetch weather data
async function fetchWeatherData(viewer, location, canvas, context) {
  try {

    let data = null
    const url = `http://api.weatherapi.com/v1/current.json?key=6dd177597e104668940221611230306&q=${location}&aqi=no`;
    const response = await fetch(url);
    data = await response.json();

    currentConditionText = data.current.condition.text;
    const currentConditionIcon = data.current.condition.icon;
    const currentConditionTemp = data.current.temp_c;
    let direction = data.current.wind_degree;

    // Get the window element
    var windowElement = document.querySelector('.weatherAPI');

    // Get the conditionText and conditionIcon elements inside the window
    var locationTextElement = windowElement.querySelector('#location');
    var conditionTextElement1 = windowElement.querySelector('#conditionText1');
    var conditionTextElement2 = windowElement.querySelector('#conditionText2');
    var conditionIconElement = windowElement.querySelector('#conditionIcon');

    // Set the text and icon values
    locationTextElement.textContent = location + "  –";
    conditionTextElement1.textContent = currentConditionText;
    conditionTextElement2.textContent = currentConditionTemp + "°";
    conditionIconElement.src = currentConditionIcon;

    // Initialise Enums and call FX functions
    setWeatherState(viewer, direction, location, canvas, context);

  } catch (error) {
    console.log("Error fetching data: " + error);
  }
}

// Initialise Enums and call FX functions
function setWeatherState(viewer, direction, location, canvas, context) {

    var WeatherStateEnum = {
      CLEAR: function () {
        createClouds(viewer, 50, 250, 500, 0.3, 0.7, 2, direction, location);
      },
      CLOUDY: function () {
        createClouds(viewer, 800, 250, 500, 0.3, 0.7, 2, direction, location);
      },
      PARTLY_CLOUDY: function (canvas, context) {
        createClouds(viewer, 200, 250, 500, 0.3, 0.7, 2, direction, location);
      },
      FOG: function () {
        createClouds(viewer, 800, 50, 100, 0.2, 0.5, 5, direction, location);
      },
      MIST: function () {
        createClouds(viewer, 300, 0.0, 15, 0.05, 0.1, 3, direction, location);
      },
      SUNNY: function () {
        createClouds(viewer, 50, 250, 500, 0.3, 0.7, 2, direction, location);
      },
      RAIN: function () {
        createClouds(viewer, 800, 250, 500, 0.3, 0.7, 2, direction, location);
        rain(canvas, context, 2000);
      },
      HEAVY_RAIN: function () {
        createClouds(viewer, 1000, 250, 500, 0.3, 0.7, 2, direction, location);
        rain(canvas, context, 5000);
      },
      LIGHT_RAIN: function () {
        createClouds(viewer, 500, 250, 500, 0.3, 0.7, 2, direction, location);
        rain(canvas, context, 500);
      },
      LIGHT_DRIZZLE: function () {
        createClouds(viewer, 200, 250, 500, 0.3, 0.7, 2, direction, location);
        rain(canvas, context, 100);
      },
      PATCHY_RAIN: function () {
        createClouds(viewer, 500, 250, 500, 0.3, 0.7, 2, direction, location);
        rain(canvas, context, 200);
      },
      OVERCAST: function () {
        createClouds(viewer, 1000, 250, 500, 0.3, 0.7, 2, direction, location);
      },
      LIGHT_SNOW: function () {
        createClouds(viewer, 100, 500, 1000, 0.3, 0.7, 2, direction, location);
        snow(canvas, context, 150);
      },
      MODERATE_SNOW: function () {
        createClouds(viewer, 100, 500, 1000, 0.3, 0.7, 2, direction, location);
        snow(canvas, context, 400);
      },
      HEAVY_SNOW: function () {
        createClouds(viewer, 100, 500, 1000, 0.3, 0.7, 2, direction, location);
        snow(canvas, context, 800);
      },
      ICE_PELLETS: function () {
        createClouds(viewer, 1000, 250, 500, 0.3, 0.7, 2, direction, location);
        makePelletsellets(canvas, context, 1000);
      },
      LIGHT_ICE_PELLETS: function () {
        createClouds(viewer, 800, 250, 500, 0.3, 0.7, 2, direction, location);
        makePellets(canvas, context, 500);
      } 

    };
  
    // Set weather enums
    switch (currentConditionText) {
      case "Clear":
        WeatherStateEnum.CLEAR();
        break;
      case "Cloudy":
        WeatherStateEnum.CLOUDY();
        break;
      case "Partly cloudy":
        WeatherStateEnum.PARTLY_CLOUDY(canvas, context);
        break;
      case "Overcast":
        WeatherStateEnum.OVERCAST();
        break;
      case "Fog":
        WeatherStateEnum.FOG();
        break;
      case "Freezing fog":
        WeatherStateEnum.FOG();
        break;
      case "Mist":
        WeatherStateEnum.MIST();
        break;
     case "Sunny":
        WeatherStateEnum.SUNNY();
        break;
      case "Rain":
        WeatherStateEnum.RAIN();
        break;      
      case "Heavy Rain":
        WeatherStateEnum.HEAVY_RAIN();
        break;
      case "Light drizzle":
        WeatherStateEnum.LIGHT_DRIZZLE();
        break;        
      case "Light rain":
        WeatherStateEnum.LIGHT_RAIN();
        break;  
      case "Moderate rain":
        WeatherStateEnum.RAIN();
        break;        
      case "Moderate or heavy rain shower":
        WeatherStateEnum.RAIN();
        break;  
      case "Light snow":
        WeatherStateEnum.LIGHT_SNOW();
        break;      
      case "Moderate snow":
        WeatherStateEnum.MODERATE_SNOW();
        break;         
      case "Heavy snow":
        WeatherStateEnum.HEAVY_SNOW();
        break;   
      case "Light rain shower":
        WeatherStateEnum.RAIN();
        break;        
      case "Patchy light rain":
        WeatherStateEnum.PATCHY_RAIN();
        break;   
      case "Ice pellets":
        WeatherStateEnum.ICE_PELLETS();
        break;   
      case "Light showers of ice pellets":
        WeatherStateEnum.LIGHT_ICE_PELLETS();
        break;  
      case "Patchy rain possible":
        WeatherStateEnum.PATCHY_RAIN();
        break;   
      case "Moderate or heavy snow showers":
        WeatherStateEnum.HEAVY_SNOW();
        break;  
      
        default:
        console.log("Unknown weather state");
    }
  }


/*


Patchy snow possible
Patchy sleet possible
Patchy freezing drizzle possible
Thundery outbreaks possible
Blowing snow
Blizzard

Patchy light drizzle
Freezing drizzle
Heavy freezing drizzle
Moderate rain at times
Heavy rain at times
Light freezing rain
Moderate or heavy freezing rain
Light sleet
Moderate or heavy sleet
Patchy light snow
Patchy moderate snow
Patchy heavy snow

Torrential rain shower
Light sleet showers
Moderate or heavy sleet showers
Light snow showers
Moderate or heavy snow showers

Moderate or heavy showers of ice pellets
Patchy light rain with thunder
Moderate or heavy rain with thunder
Patchy light snow with thunder
Moderate or heavy snow with thunder

*/