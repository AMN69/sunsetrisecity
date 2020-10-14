const cityLatLong = [{
  cityname: "Aberdeen",
  cityCountry: "Scotland",
  cityLat: 57.9,
  cityLon: 2.9
  },
  {
  cityname: "Adelaide",
  cityCountry: "Australia" ,
  cityLat: 34.55,
  cityLon: 138.36 
  },
  {
  cityname: "Algiers",
  cityCountry: "Algeria",
  cityLat: 36.50,
  cityLon: 3.0
  },
  {
  cityname: "Amsterdam",
  cityCountry: "Netherlands",
  cityLat: 52.22,
  cityLon: 4.53
  },
  {
  cityname: "Ankara",
  cityCountry: "Turkey",
  cityLat: 39.55,
  cityLon: 32.55
  },
  {
  cityname: "Asunción",
  cityCountry: "Paraguay",
  cityLat: 25.15,
  cityLon: 57.40
  },
  {
  cityname: "Athens",
  cityCountry: "Greece",
  cityLat: 37.58,
  cityLon: 23.43
  },
  {
  cityname: "Auckland",
  cityCountry: "New Zealand",
  cityLat: 36.52,
  cityLon: 174.45
  },
  {
  cityname: "Bangkok",
  cityCountry: "Thailand",
  cityLat: 13.45,
  cityLon: 100.30
  },
  {
  cityname: "Barcelona",
  cityCountry: "Spain",
  cityLat: 41.23,
  cityLon: 2.9
  },
  {
  cityname: "Beijing",
  cityCountry: "China",
  cityLat: 39.55,
  cityLon: 116.25
  },
  {
  cityname: "Belém",
  cityCountry: "Brazil",
  cityLat: 1.28,
  cityLon: 48.29
},
{
  cityname: "Belfast",
  cityCountry: "Northern Ireland",
  cityLat: 54.37,
  cityLon: 5.56
  },
  {
  cityname: "Belgrade",
  cityCountry: "Serbia",
  cityLat: 44.52,
  cityLon: 20.32
  },
  {
  cityname: "Berlin",
  cityCountry: "Germany",
  cityLat: 52.30,
  cityLon: 13.25
  },
  {
  cityname: "Birmingham",
  cityCountry: "England",
  cityLat: 52.25,
  cityLon: 1.55
  },
  {
  cityname: "Bogotá",
  cityCountry: "Colombia",
  cityLat: 4.32,
  cityLon: 74.15
  },
  {
  cityname: "Bombay",
  cityCountry: "India",
  cityLat: 19.0,
  cityLon: 72.48
  },
  {
  cityname: "Bordeaux",
  cityCountry: "France",
  cityLat: 44.50,
  cityLon: 0.31
  },
  {
  cityname: "Bremen",
  cityCountry: "Germany",
  cityLat: 53.5,
  cityLon: 8.49
  },
  {
  cityname: "Brisbane",
  cityCountry: "Australia",
  cityLat: 27.29,
  cityLon: 153.8
  },
  {
  cityname: "Bristol",
  cityCountry: "England",
  cityLat: 51.28,
  cityLon: 2.35
  }
];

// {
//   cityname: "",
//   cityCountry: "",
//   cityLat: ,
//   cityLon: 
// }


//const api = 'https://api.sunrise-sunset.org/json?lat=42.38&lng=3.15';
async function getLatLon(lat, lon) {
  const api = "https://api.sunrise-sunset.org/json?lat="+lat+"&lng="+lon;
  const apiResponse = await fetch(api);
  const apiList = await apiResponse.json();
  return apiList;
}

addCityListeners = () => {
  city1Input = document.querySelector(".city1");
  city2Input = document.querySelector(".city2");
  // https://stackoverflow.com/questions/24875414/addeventlistener-change-and-option-selection
  city1Input.addEventListener("change", handleCity1Input);
  city2Input.addEventListener("change", handleCity2Input);
}

renderInfoCity1 = (apiListCity1) => {
  let sunRise1 = "Sunrise: " + apiListCity1.results.sunrise;
  let sunSet1 = "Sunset: " + apiListCity1.results.sunset;
  let solarNoon1 = "Solar noon: " + apiListCity1.results.solar_noon;
  let dayLength1 = "Day length: " + apiListCity1.results.day_length;
  let civilTwilightBegin1 = "Twilight begins: " + apiListCity1.results.civil_twilight_begin;
  let civilTwilightEnd1 = "Twilight ends: " + apiListCity1.results.civil_twilight_end;

  document.getElementsByClassName('ctime1').innerHTML(sunRise1);
  document.getElementsByClassName('sstime1').innerHTML(sunSet1);
  document.getElementsByClassName('sntime1').innerHTML(solarNoon1);
  document.getElementsByClassName('dltime1').innerHTML(dayLength1);
  document.getElementsByClassName('tbtime1').innerHTML(civilTwilightBegin1);
  document.getElementsByClassName('tetime1').innerHTML(civilTwilightEnd1);
}

renderInfoCity2 = (apiListCity2) => {
  let sunRise2 = apiListCity1.results.sunrise;
  let sunSet2 = apiListCity1.results.sunset;
  let solarNoon2 = apiListCity1.results.solar_noon;
  let dayLength2 = apiListCity1.results.day_length;
  let civilTwilightBegin2 = apiListCity1.results.civil_twilight_begin;
  let civilTwilightEnd2 = apiListCity1.results.civil_twilight_end;

  document.getElementsByClassName('ctime2').innerHTML(sunRise2);
  document.getElementsByClassName('sstime2').innerHTML(sunSet2);
  document.getElementsByClassName('sntime2').innerHTML(solarNoon2);
  document.getElementsByClassName('dltime2').innerHTML(dayLength2);
  document.getElementsByClassName('tbtime2').innerHTML(civilTwilightBegin2);
  document.getElementsByClassName('tetime2').innerHTML(civilTwilightEnd2);
}

handleCity1Input = (event) => {
  const city1Input = event.target.value;
  let city1Index;
  let i = 0;
  while (i < cityLatLong.length) {
    if (city1Input == cityLatLong[i]) {
      city1Index = i;
      i = cityLatLong.length;
    }
    i++;
  }
  let apiListCity1 = getLatLon(cityLatLong[city1Index].cityLat, cityLatLong[city1Index].cityLon);
  
  renderInfoCity1(apiListCity1);
}

handleCity2Input = (event) => {
  const city2Input = event.target.value;
  let i = 0;
  while (i < cityLatLong.length) {
    if (city2Input == cityLatLong[i]) {
      i = cityLatLong.length;
    }
    i++;
  }
  let apiListCity2 = getLatLon(cityLatLong[i].cityLat, cityLatLong[i].cityLon);

  renderInfoCity1(apiListCity1);
}

// window.addEventListener("load", signup.addCityListeners());

window.addEventListener("load", addCityListeners());


