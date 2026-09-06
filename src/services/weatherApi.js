const KEY_API = "d50ef4f57d9342f78be72527260509";

export async function weatherApi(query) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${KEY_API}&q=${query}`,
  );
  return response.json();
}
