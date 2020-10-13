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
  cityname: "",
  cityCountry: "",
  cityLat: ,
  cityLon: 
},
{
  cityname: "",
  cityCountry: "",
  cityLat: ,
  cityLon: 
},
{
  cityname: "",
  cityCountry: "",
  cityLat: ,
  cityLon: 
},

];

{
  cityname: "",
  cityCountry: "",
  cityLat: ,
  cityLon: 
}


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
  city1Input.addEventListener("input", handleCity1Input);
  city2Input.addEventListener("input", handleCity2Input);
}

renderInfoCity1 = (apiListCity1) => {
  let sunrise = apiListCity1.results.sunrise;
  let sunset = apiListCity1.results.sunset;
}

renderInfoCity2 = (apiListCity2) => {

}

handleCity1Input = (event) => {
  const city1Input = event.target.value;
  let i = 0;
  while (i < cityLatLong.length) {
    if (city1Input == cityLatLong[i]) {
      i = cityLatLong.length;
    }
    i++;
  }
  let apiListCity1 = getLatLon(cityLatLong[i].cityLat, cityLatLong[i].cityLon);
  
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

window.addEventListener("load", signup.addCityListeners());


