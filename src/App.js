import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5df806a025e90ac22a0bedc34953c5fe`)
      .then(response => {
        setWeatherData(response.data);
        console.log(weatherData);
      }).catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>City: {weatherData.name}</h1>
        <h2>Cod: {weatherData.cod}</h2>
        <h2>Temp: {weatherData.main ? weatherData.main.temp : "no data"}</h2>
        <h2>Feels Like Temp: {weatherData.main ? weatherData.main.feels_like : "no data"}</h2>
      </header>
    </div>
  );
}

export default App;
