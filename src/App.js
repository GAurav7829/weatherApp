import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardBody,
  CardTitle, CardSubtitle, Container, Table,
  InputGroup, InputGroupAddon, Input, Button
} from 'reactstrap';

const appid = '5df806a025e90ac22a0bedc34953c5fe';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    getGeoLocn();
  }, [lon, lat]);
  const getCityTemp = () => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${appid}`)
      .then(response => {
        setWeatherData(response.data);
        setError('');
      }).catch(error => {
        console.log(error);
        setError('No City Found');
      });
    setCity('');
  }
  const getGeoLocn = () => {
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${appid}`)
      .then(response => {
        setWeatherData(response.data);
        setError('');
      }).catch(error => {
        console.log(error);
        setError('Not able to find your location');
      });
  }
  return (
    <div className="App">
      <header className="App-header">
        <Container className="Container" >
          <div className="offset-md-3 col-md-6">
            <Card>
              <CardBody style={weatherData.main ? weatherData.main.temp > 18 ? { backgroundColor: '#D1AC1D' } : { backgroundColor: '#5E77EE' } : null} >
                <CardTitle tag="h5">{weatherData.name}<sup>{weatherData.sys ? weatherData.sys.country : ''}</sup></CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">{weatherData.weather ? weatherData.weather[0].main : ''}</CardSubtitle>
                <hr />
                <Table>
                  <tbody>
                    <tr>
                      <th scope="row">Temperature</th>
                      <td>{weatherData.main ? `${weatherData.main.temp}° C` : "no data"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Humidity</th>
                      <td>{weatherData.main ? `${weatherData.main.humidity}%` : "no data"}</td>
                    </tr>
                    <tr>
                      <th scope="row">wind</th>
                      <td>{weatherData.wind ? `${weatherData.wind.speed} Km/H, ${weatherData.wind.deg}°` : "no data"}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
          <div className="offset-md-3 col-md-6">
            <InputGroup>
              <Input placeholder="Enter City Name To Search" value={city} onChange={(e) => { setCity(e.target.value) }} />
              <InputGroupAddon addonType="append">
                <Button color="info" onClick={getCityTemp}>Search</Button>
              </InputGroupAddon>
              <InputGroupAddon addonType="append">
                <Button outline color="info" onClick={getGeoLocn}><img src='/gps_fixed.png' alt='Get Current Location' /></Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="offset-md-3 col-md-6">
            <div style={{ color: '#FA5C1A' }}>{error}</div>
          </div>
        </Container>

      </header>
    </div >
  );
}

export default App;
//deg sign alt + 0176 = °