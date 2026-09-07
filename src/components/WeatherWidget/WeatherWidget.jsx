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
  const [weatherType, setWeatherType] = useState("sunny");
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    // Получение геопозиции
    if (!navigator.geolocation)
      return setError("The geolocation is unavailable");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      },
      (err) => {
        console.error("Geolocation error", err.message);
        setError("Your geolocation is disabled");
      },
    );
  }, []);

  useEffect(() => {
    // Рендер данных для виджета
    if (!city.trim() && !coords) {
      setWeatherData(null);
      setError(null);
      return;
    }
    setLoading(true);
    async function getData() {
      try {
        const query = city.trim()
          ? city
          : `${coords.latitude},${coords.longitude}`;
        const data = await weatherApi(query);
        if (data.error) {
          setError(data.error.message);
          setWeatherData(null);
          return;
        }
        setWeatherData(data);
        console.log(data);
        setError(null);
        const type = getWeatherType(data.current.condition.text);
        setWeatherType(type);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [city, coords]);

  useEffect(() => {
    // Определение фона body под тип погоды
    document.body.className = `body--${weatherType}`;
  }, [weatherType]);

  function getWeatherType(condition) {
    // Сохранение типа погоды
    if (!condition) return;
    const normalizedCondition = condition.toLowerCase();
    if (normalizedCondition.includes("rain")) return "rain";
    if (normalizedCondition.includes("thunder")) return "thunder";
    if (normalizedCondition.includes("haze")) return "haze";
    if (normalizedCondition.includes("overcast")) return "cloudy";
    return "sunny";
  }
  return (
    <section className="widget">
      <div className="widget__container">
        <h1 className="widget__title">Weather Widget</h1>
        <div className="widget__search">
          <input
            type="text"
            placeholder="Введите город"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="widget__search-input"
          />
        </div>
        <div className="widget__result">
          {loading && <Loading />}
          {error && <Error message={error} />}
          {!error && !loading && weatherData && (
            <WeatherCard weather={weatherData} />
          )}
        </div>
      </div>
    </section>
  );
}
