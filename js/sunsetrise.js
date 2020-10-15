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

// Global variables to be used to calculate differences - City 1 -
let sunRise1Kept;
let sunSet1Kept;
let solarNoon1Kept;
let dayLength1Kept;
let civilTwilightBegin1Kept;
let civilTwilightEnd1Kept;
// Global variables to be used to calculate differences - City 2 -
let sunRise2Kept;
let sunSet2Kept;
let solarNoon2Kept;
let dayLength2Kept;
let civilTwilightBegin2Kept;
let civilTwilightEnd2Kept; 
// Global variables to be used to calculate differences - Between cities 1 & 2 -
let diffSunRise;
let diffSunSet;

let isCity1Informed = false;
let isCity2Informed = false;

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
  //console.log("Sunrise2 value: " + sunRise2);
  if (isCity1Informed && isCity2Informed) {
    diffSunRise = await calculateDifferences(sunRise1Kept, sunRise2Kept);
    diffSunSet = await calculateDifferences(sunSet1Kept, sunSet2Kept);
    diffSolarNoon = await calculateDifferences(solarNoon1Kept, solarNoon2Kept);
    diffDayLength = await calculateDifferences(dayLength1Kept, dayLength2Kept);
    diffTwilightBeg = await calculateDifferences(civilTwilightBegin1Kept, civilTwilightBegin2Kept);
    diffTwilightEnd = await calculateDifferences(civilTwilightEnd1Kept, civilTwilightEnd2Kept);
    await renderDiff();  
  }
  
  return apiList;
}

addCityListeners = () => {
  city1Input = document.querySelector(".city1");
  city2Input = document.querySelector(".city2");
  // https://stackoverflow.com/questions/24875414/addeventlistener-change-and-option-selection
  city1Input.addEventListener("change", handleCity1Input);
  city2Input.addEventListener("change", handleCity2Input);
};

renderInfoCity1 = (apiListCity1) => {
  let sunRise1 = "Sunrise: " + apiListCity1.results.sunrise;
  let sunSet1 = "Sunset: " + apiListCity1.results.sunset;
  let solarNoon1 = "Solar noon: " + apiListCity1.results.solar_noon;
  let dayLength1 = "Day length: " + apiListCity1.results.day_length;
  let civilTwilightBegin1 = "Twilight begins: " + apiListCity1.results.civil_twilight_begin;
  let civilTwilightEnd1 = "Twilight ends: " + apiListCity1.results.civil_twilight_end;
  
  sunRise1Kept = apiListCity1.results.sunrise;
  sunSet1Kept = apiListCity1.results.sunset;
  solarNoon1Kept = apiListCity1.results.solar_noon;
  dayLength1Kept = apiListCity1.results.day_length;
  civilTwilightBegin1Kept = apiListCity1.results.civil_twilight_begin;
  civilTwilightEnd1Kept = apiListCity1.results.civil_twilight_end;

  //console.log("sunRise1", sunRise1);
  
  document.querySelector('.srtime1').innerText = sunRise1;
  document.querySelector('.sstime1').innerText = sunSet1;
  document.querySelector('.sntime1').innerText = solarNoon1;
  document.querySelector('.dltime1').innerText = dayLength1;
  document.querySelector('.tbtime1').innerText = civilTwilightBegin1;
  document.querySelector('.tetime1').innerText = civilTwilightEnd1;
  isCity1Informed = true;
};

renderInfoCity2 = (apiListCity2) => {
  let sunRise2 = "Sunrise: " + apiListCity2.results.sunrise;
  let sunSet2 = "Sunset: " + apiListCity2.results.sunset;
  let solarNoon2 = "Solar noon: " + apiListCity2.results.solar_noon;
  let dayLength2 = "Day length: " + apiListCity2.results.day_length;
  let civilTwilightBegin2 = "Twilight begins: " + apiListCity2.results.civil_twilight_begin;
  let civilTwilightEnd2 = "Twilight ends: " + apiListCity2.results.civil_twilight_end;

  sunRise2Kept = apiListCity2.results.sunrise;
  sunSet2Kept = apiListCity2.results.sunset;
  solarNoon2Kept = apiListCity2.results.solar_noon;
  dayLength2Kept = apiListCity2.results.day_length;
  civilTwilightBegin2Kept = apiListCity2.results.civil_twilight_begin;
  civilTwilightEnd2Kept = apiListCity2.results.civil_twilight_end;

  document.querySelector('.srtime2').innerText = sunRise2;
  document.querySelector('.sstime2').innerText = sunSet2;
  document.querySelector('.sntime2').innerText = solarNoon2;
  document.querySelector('.dltime2').innerText = dayLength2;
  document.querySelector('.tbtime2').innerText = civilTwilightBegin2;
  document.querySelector('.tetime2').innerText = civilTwilightEnd2;
  isCity2Informed = true;
};

renderDiff = () => {
  let sunRiseDiff = "<-- " + diffSunRise + "-->";
  let sunSetDiff = "<--" + diffSunSet + "-->";
  let solarNoonDiff = "<--" + diffSolarNoon + "-->";
  let dayLengthDiff = "<--" + diffDayLength + "-->";
  let twilightBegDiff = "<--" + diffTwilightBeg + "-->";
  let twilightEndDiff = "<--" + diffTwilightEnd + "-->";

  document.querySelector('.d-srtime').innerText = sunRiseDiff;
  document.querySelector('.d-sstime').innerText = sunSetDiff;
  document.querySelector('.d-sntime').innerText = solarNoonDiff;
  document.querySelector('.d-dltime').innerText = dayLengthDiff;
  document.querySelector('.d-tbtime').innerText = twilightBegDiff;
  document.querySelector('.d-tetime').innerText = twilightEndDiff;
};

function renderCity1map(city, country) {
  document.querySelector('.map-frame1').setAttribute("src", "https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=8h5lXXll3zO_hFQT2b_jH8x9NOGoi5OjhgQ3w8JBVYA&co=" + country + "&ci=" + city);
}

function renderCity2map(city, country) {
  document.querySelector('.map-frame2').setAttribute("src", "https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=8h5lXXll3zO_hFQT2b_jH8x9NOGoi5OjhgQ3w8JBVYA&co=" + country + "&ci=" + city);
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
  renderCity1map(cityLatLong[city1Index].cityname, cityLatLong[city1Index].cityCountry);
  getLatLon(cityLatLong[city1Index].cityLat, cityLatLong[city1Index].cityLon, 1);
  //city1map();
  //console.log("Back from API: ", apiListCity1);
  //renderInfoCity1(apiListCity1);
};

// // STARTS HERE map - code got from their API.

// function moveMapToBerlin(map){
//   map.setCenter({lat: 52.5159, lng: 13.3777});
//   map.setZoom(14);
// }

// //Step 1: initialize communication with the platform
// // In your own code, replace variable window.apikey with your own apikey
// function city1map () {
//   var platform = new H.service.Platform({
//     apikey: '8h5lXXll3zO_hFQT2b_jH8x9NOGoi5OjhgQ3w8JBVYA'
//   });
//   var defaultLayers = platform.createDefaultLayers();

//   //Step 2: initialize a map - this map is centered over Europe
//   var map = new H.Map(document.getElementById('map'),
//     defaultLayers.vector.normal.map,{
//     center: {lat:50, lng:5},
//     zoom: 4,
//     pixelRatio: window.devicePixelRatio || 1
//   });
//   // add a resize listener to make sure that the map occupies the whole container
//   window.addEventListener('resize', () => map.getViewPort().resize());

//   //Step 3: make the map interactive
//   // MapEvents enables the event system
//   // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
//   var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

//   // Create the default UI components
//   var ui = H.ui.UI.createDefault(map, defaultLayers);

//   // Now use the map as required...
//   window.onload = function () {
//     moveMapToBerlin(map);
//   };
// }

// // ENDS HERE map - code got from their API.

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
  renderCity2map(cityLatLong[city2Index].cityname, cityLatLong[city2Index].cityCountry);
  getLatLon(cityLatLong[city2Index].cityLat, cityLatLong[city2Index].cityLon, 2);

  // renderInfoCity1(apiListCity1);
};

calculateDifferences = (time1, time2) => {
  
  var splitted = time1.split(' ');
  var amPm1 = splitted[1];
  var time = splitted[0].split(':');
  var hour1 = time[0];
  var min1 = time[1];
  var sec1 = time[2];

  splitted = time2.split(' ');
  var amPm2 = splitted[1];
  time = splitted[0].split(':');
  var hour2 = time[0];
  var min2 = time[1];
  var sec2 = time[2];

  if (amPm1 === 'PM') {
    hour1 = parseInt(hour1) + 12;
    //hour1 = hour1.toString();
  }

  if (amPm2 === 'PM') {
    hour2 = parseInt(hour2) + 12;
    //hour2 = hour2.toString();
  }

  hour1 = parseInt(hour1);
  hour2 = parseInt(hour2);
  min1 = parseInt(min1);
  min2 = parseInt(min2);
  sec1 = parseInt(sec1);
  sec2 = parseInt(sec2);

  var hour1sec = hour1 * 60 * 60 + min1 * 60 + sec1;
  var hour2sec = hour2 * 60 * 60 + min2 * 60 + sec2;
  var hourDiff = 0;

  if (hour1sec > hour2sec) {
    hourDiff = hour1sec - hour2sec;
  } else {
    hourDiff = hour2sec - hour1sec;
  }

  hourDiffTime = secondsToString(hourDiff);  
  return hourDiffTime;
};

function secondsToString(seconds) {
  var hour = Math.floor(seconds / 3600);
  hour = hour < 10 ? '0' + hour : hour;
  var minute = Math.floor((seconds / 60) % 60);
  minute = minute < 10 ? '0' + minute : minute;
  var second = seconds % 60;
  second = second < 10 ? '0' + second : second;
  return hour + ':' + minute + ':' + second;
}

function loadCities () {
  var querySelected;
  var node;
  var textnode;
  for (let i = 0; i < cityLatLong.length; i++) {
    querySelected = document.querySelector('.city1');
    node = document.createElement('option');
    console.log (node);
    node.setAttribute("value", cityLatLong[i].cityname);
    console.log("city: ", cityLatLong[i].cityname)
    node.innerText = cityLatLong[i].cityname;
    console.log (node);
    querySelected.appendChild(node);
  }
}

// window.addEventListener("load", signup.addCityListeners());
loadCities();
window.addEventListener("load", addCityListeners());


