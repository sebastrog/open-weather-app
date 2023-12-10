import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [data, setData] = useState(null);
  const [location, setLocation] = useState('medellin');
  const [error, setError] = useState('');
  
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=e43d49c860a8894e068a2ea53e402c0b`;

  const searchLocation =  async (e) => {
    setError('');
    try {
      if(e.key === "Enter") {
        const jaja = await axios.get(URL).then(response => {
          return response.data;
        });
        setData(jaja);
        setError('');
        setLocation('')
      }
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between w-full h-screen p-5 text-center">
        <div className="w-full">
          <input 
            type="text" 
            placeholder="Enter Location"
            className="rounded-3xl border-2 bg-white bg-opacity-30 h-10 px-5 w-full  sm:w-[300px] placeholder:text-white text-white"
            onKeyDown={searchLocation}
            onChange={e => setLocation(e.target.value)}
          />

          <p className="text-white font-bold text-sm">{error && error.message}</p>
        </div>

        

        {data ? (
          <>
            <div className="text-white w-full">
              <p className="text-2xl">{data.name}</p>
              <p className="text-2xl md:text-8xl font-bold">{data.main?.temp.toFixed()}°F</p>
              <p className="text-2xl">{data?.weather ? data?.weather[0].main : ""}</p>
            </div>

            <div className="text-white w-full text-2xl">
              <div className="flex items-center gap-4 justify-center bg-white bg-opacity-25 rounded-xl px-2 py-5">
                <div>
                  <p className="text-sm sm:text-lg font-bold">{data.main?.feels_like.toFixed()}°F</p>
                  <p className="text-sm">Feels like</p>
                </div>
                <div>
                  <p className="text-sm sm:text-lg font-bold">{data.main?.humidity}%</p>
                  <p className="text-sm">Humidity</p>
                </div>
                <div>
                  <p className="text-sm sm:text-lg font-bold">{data.wind?.speed} MPH</p>
                  <p className="text-sm">Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        ) : ''}
      </div>
    </>
  )
}

export default App
