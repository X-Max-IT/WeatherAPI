import { API_KEY } from "../../config";

export async function weatherApi(query) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${query}`,
  );
  return response.json();
}
