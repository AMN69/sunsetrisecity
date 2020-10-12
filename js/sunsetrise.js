const api = 'https://api.sunrise-sunset.org/json?lat=42.38&lng=3.15';
async function getProfiles() {
  const apiResponse = await fetch(api);
  const apiList = await apiResponse.json();
  return apiList;
}

getProfiles();
