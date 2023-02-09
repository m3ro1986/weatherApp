import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'

function App() {

    const [apiWeather, setApiWeather] = useState({});
    const [ temp, setTemp ] = useState( 0 );
    const [ deg, setDeg ] = useState( 'K°' );
    useEffect(() => {


        function success(pos) {
            const crd = pos.coords;

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=8479059023e872bec83f4d74dbbd45fd`)
                .then(res => {
                    setApiWeather(res.data);
                    setTemp( res.data.main.temp )
                })

        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error);

    }, []);

    const toCentigrades = ( ) => {
        if ( deg !== 'C°')
            setTemp( ( apiWeather.main.temp - 273.15 ).toFixed(2) )
            setDeg( 'C°' )
    }

    const toKelvin = () => {
        if ( deg !== 'K°')
            setTemp( apiWeather.main.temp )
            setDeg( 'K°' )
    }
    const toFahrenheit = () => {
        if ( deg !== 'F°')
            setTemp( (( apiWeather.main.temp - 273.15 ) * (9/5) + 32).toFixed(2) )
            setDeg( 'F°' )
    }

    return (
        <div className="App clearSky">
            <div className='weatherBox'>
                <h1> weather App </h1>
                <h3> {apiWeather.name}, {apiWeather.sys?.country}. </h3>
                <div className='weatherBox-info'>
                    <img src={`http://openweathermap.org/img/wn/${apiWeather.weather?.[0].icon}@2x.png`} alt="" />
                    <div className='weatherBox-info_stats'>
                        <span style={{ textAlign: 'center ' }}>{apiWeather.weather?.[0].description}</span>
                        <div className='stats'>
                            <div> <i className='bx bx-wind'></i> wind-speed: <span>{apiWeather.wind?.speed} m/s</span>  </div>
                            <div> <i className='bx bx-cloud'></i> Clouds: <span>{apiWeather.clouds?.all}%</span>  </div>
                            <div> <i className='bx bx-test-tube'></i> Pressure: <span>{apiWeather.main?.pressure} hPa</span> </div>
                            <div> <i className='bx bx-droplet'></i> Humidity: <span>{apiWeather.main?.humidity}%</span> </div>
                        </div>
                    </div>
                </div>
                <span> { temp } { deg }</span>
                <div className='buttonsBox'>
                    <button onClick={ toCentigrades }> C°</button>
                    <button onClick={ toKelvin }> K°</button>
                    <button onClick={ toFahrenheit }> F°</button>
                </div>
            </div>
        </div>
    )
}

export default App
