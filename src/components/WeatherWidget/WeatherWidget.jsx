import { useEffect, useState } from "react";

export function WeatherWidget() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <section className="widget">
      <div className="widget__container">
        <div className="widget__search">
          <input />
        </div>
      </div>
    </section>
  );
}
