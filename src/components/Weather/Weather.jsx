import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weather.css'
const Weather = () => {
const [weatherData, setWeatherData] = useState(null);

  const [location, setLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      const { latitude, longitude } = location;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=75e7bb37bc2e886576ed06913667892b`
        )
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [location]);

  const getIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
        return `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
      case '02d':
      case '03d':
        return `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
      case '04d':
        return `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
      case '09d':
      case '10d':
        return `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
      case '11d':
        return `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
      case '13d':
        return `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
      case '50d':
        return `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;
      default:
        return '';
    }
  }
  if(!weatherData) return (<div className='container'>Loading...</div>)
  return (
    <div className='container'>
      {weatherData &&
        <div className='weather-card'>
          <div className='weather-text'>
            <p className='country'>{weatherData.name} ,{weatherData.sys.country}</p>
            <p className='description'>{weatherData.weather[0].description}</p>
            <p className='temp'>{weatherData.main.temp}&deg;C</p>
          </div>
          <img src={getIcon(weatherData.weather[0].icon)} alt={weatherData.weather[0].description} />
        </div>
      }
        <div className="weather-details">
            humidity: {weatherData && weatherData.main.humidity}%
            <br />
            wind: {weatherData && weatherData.wind.speed} m/s
            <br />
            pressure: {weatherData && weatherData.main.pressure} hPa
            <br />
            feels like: {weatherData && weatherData.main.feels_like} &deg;C
        </div>
    </div>
  );
}

export default Weather;
