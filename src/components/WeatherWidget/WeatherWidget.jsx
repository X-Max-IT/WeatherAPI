import { useEffect, useState } from "react";
import { weatherApi } from "../../services/weatherApi";
import { Loading } from "../Loader/Loader";
import { Error } from "../Error/Error";
import { WeatherCard } from "../WeatherCard/WeatherCard";

export function WeatherWidget() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getData() {
      try {
        const data = await weatherApi(city);
        if (data.error) {
          setError(data.error.message);
          setWeatherData(null);
          return;
        }
        setWeatherData(data);
        setError(null);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [city]);

  return (
    <section className="widget">
      <div className="widget__container">
        <div className="widget__search">
          <input
            type="text"
            placeholder="Введите город"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        {loading && <Loading />}
        {error && <Error message={error} />}
        {weatherData && <WeatherCard />}
      </div>
    </section>
  );
}
