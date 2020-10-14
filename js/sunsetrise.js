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
async function getLatLon(lat, lon, city) {
  const api = "https://api.sunrise-sunset.org/json?lat="+lat+"&lng="+lon;
  const apiResponse = await fetch(api);
  const apiList = await apiResponse.json();
  if (city === 1) {
    await renderInfoCity1(apiList);  
  } else {
    await renderInfoCity2(apiList);
  }
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
  //console.log("sunRise1", sunRise1);
  
  document.querySelector('.srtime1').innerText = sunRise1;
  document.querySelector('.sstime1').innerText = sunSet1;
  document.querySelector('.sntime1').innerText = solarNoon1;
  document.querySelector('.dltime1').innerText = dayLength1;
  document.querySelector('.tbtime1').innerText = civilTwilightBegin1;
  document.querySelector('.tetime1').innerText = civilTwilightEnd1;
}

renderInfoCity2 = (apiListCity2) => {
  let sunRise2 = "Sunrise: " + apiListCity2.results.sunrise;
  let sunSet2 = "Sunset: " + apiListCity2.results.sunset;
  let solarNoon2 = "Solar noon: " + apiListCity2.results.solar_noon;
  let dayLength2 = "Day length: " + apiListCity2.results.day_length;
  let civilTwilightBegin2 = "Twilight begins: " + apiListCity2.results.civil_twilight_begin;
  let civilTwilightEnd2 = "Twilight ends: " + apiListCity2.results.civil_twilight_end;

  document.querySelector('.srtime2').innerText = sunRise2;
  document.querySelector('.sstime2').innerText = sunSet2;
  document.querySelector('.sntime2').innerText = solarNoon2;
  document.querySelector('.dltime2').innerText = dayLength2;
  document.querySelector('.tbtime2').innerText = civilTwilightBegin2;
  document.querySelector('.tetime2').innerText = civilTwilightEnd2;
}

handleCity1Input = (event) => {
  const city1Input = event.target.value;
  //console.log('City1Input: ', city1Input);
  let city1Index;
  let i = 0;
  while (i < cityLatLong.length) {
    //console.log("Var i: ", i);
    if (city1Input === cityLatLong[i].cityname) {
      city1Index = i;
      i = cityLatLong.length;
      // console.log("Var i within if: ", i);
      // console.log("Var city1Index: ", city1Index);
    }
    i++;
  }
  //console.log("City1Index: ", city1Index);

  getLatLon(cityLatLong[city1Index].cityLat, cityLatLong[city1Index].cityLon, 1);
  //console.log("Back from API: ", apiListCity1);
  //renderInfoCity1(apiListCity1);
}

handleCity2Input = (event) => {
  const city2Input = event.target.value;
  let city2Index;
  let i = 0;
  while (i < cityLatLong.length) {
    if (city2Input === cityLatLong[i].cityname) {
      city2Index = i;
      i = cityLatLong.length;
    }
    i++;
  }
  getLatLon(cityLatLong[city2Index].cityLat, cityLatLong[city2Index].cityLon, 2);

  // renderInfoCity1(apiListCity1);
}

// window.addEventListener("load", signup.addCityListeners());

window.addEventListener("load", addCityListeners());


