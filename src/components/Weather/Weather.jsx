import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AsyncPaginate } from 'react-select-async-paginate';
import './weather.css'
const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [locationGeo, setLocationGeo] = useState(null);
  const [location, setLocation] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const WEATHER_API ="e1d2e14d3d96ad5395a7e94932a81580";
  const GEOCODING_API = "59f531a7874a47aa854f6900e5f1bdfa";

    axios
    .get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${GEOCODING_API}`)
    .then(response => {
        const { lat, lng } = response.data.results[0].geometry;
        setLatitude(lat);
        setLongitude(lng);
    })
    .catch(error => {
        console.log(error.message)
    })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { lat, lon } = position.coords;
        setLocationGeo({ lat, lon });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);
  useEffect(() => {
    if (locationGeo) {
      const { lat, lon } = locationGeo;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=75e7bb37bc2e886576ed06913667892b`
        )
        .then((response) => {
          setWeatherData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [locationGeo]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API}&units=metric`)
    .then(response => {
        console.log(response.data)
        setWeatherData(response.data);
    })
    .catch(error => {
        console.log(error.message)
    })
    };

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
  // if(!weatherData) return (<div className='container'>Loading...</div>)
  return (
    <div className='container'>

      <form 
        onSubmit={handleSubmit}
        >
          <input 
            placeholder='Search for city'
            type="text" 
            value={location} 
            onChange={event => setLocation(event.target.value)} 
          />
        <button type="submit">Get weather</button>
      </form>

      {weatherData &&
        <>
          <div className='weather-card'>
              <div className='weather-text'>
                <p className='country'>{weatherData.name} ,{weatherData.sys.country}</p>
                <p className='description'>{weatherData.weather[0].description}</p>
                <p className='temp'>{weatherData.main.temp}&deg;C</p>
              </div>
              <img src={getIcon(weatherData.weather[0].icon)} alt={weatherData.weather[0].description} />
          </div>
          <div className="weather-details">
            humidity: {weatherData && weatherData.main.humidity}%
            <br />
            wind: {weatherData && weatherData.wind.speed} m/s
            <br />
            pressure: {weatherData && weatherData.main.pressure} hPa
            <br />
            feels like: {weatherData && weatherData.main.feels_like} &deg;C
          </div>
       </>
      }
        
    </div>
  );
}

export default Weather;
