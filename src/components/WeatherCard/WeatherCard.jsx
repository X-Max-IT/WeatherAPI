export function WeatherCard({ weather }) {
  return (
    <article className="card">
      <header className="card__header">
        <h3 className="card__city">
          {weather
            ? `${weather.location.name}, ${weather.location.country}`
            : "Enter the city"}
        </h3>
        {weather?.current.condition.icon ? (
          <img
            src={weather.current.condition.icon}
            alt={weather.location.name}
            className="card__icon"
          />
        ) : (
          <span>❔</span>
        )}

        <p className="card__temperature">
          {weather?.current?.temp_c != null
            ? Math.round(weather.current.temp_c)
            : "--"}
          °C
        </p>
        <p className="card__description">
          {weather?.current?.condition?.text ?? "Enter the city"}
        </p>
      </header>
      <footer className="card__footer">
        <div className="card__item">
          <img className="card__item-icon" src="/ветер(line).svg" />
          <p className="card__item-text">
            {weather?.current?.wind_kph ?? "--"} km/h
            <br />
            Wind
          </p>
        </div>
        <div className="card__item">
          <img className="card__item-icon h-two-o" src="/капля.svg" />
          <p className="card__item-text">
            {weather?.current?.humidity ?? "0"}%
            <br />
            Humidity
          </p>
        </div>
      </footer>
    </article>
  );
}
