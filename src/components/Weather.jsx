import React, { useEffect, useState, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const [searchHistory, setSearchHistory] = useState(() => {
        // Initialize from localStorage if available
        const saved = localStorage.getItem('searchHistory');
        return saved ? JSON.parse(saved) : [];
    });
    const [error, setError] = useState(null);
    const [greeting, setGreeting] = useState({text: '', icon: '', background: ''});

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    // Generate greeting based on time of day
    useEffect(() => {
        const hour = new Date().getHours();
        let greetingText = "";
        let greetingIcon = "";
        let greetingBackground = "";
        
        if (hour >= 5 && hour < 12) {
            greetingText = "Good Morning! Discover today's forecast";
            greetingIcon = clear_icon;
            greetingBackground = "morning-gradient";
        } else if (hour >= 12 && hour < 18) {
            greetingText = "Good Afternoon! Check weather updates";
            greetingIcon = cloud_icon;
            greetingBackground = "afternoon-gradient";
        } else {
            greetingText = "Good Evening! Browse weather conditions";
            greetingIcon = clear_icon;
            greetingBackground = "evening-gradient";
        }
        
        setGreeting({
            text: greetingText, 
            icon: greetingIcon,
            background: greetingBackground
        });
    }, []);

    const search = async (city) => {
        if (!city?.trim()) {
            alert("Please enter the city name");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });

            
            updateSearchHistory(data.name);
            setError(null); 
        } catch (error) {
            setWeatherData(false);
            setError(error.message);
            console.error("Error in fetching weather data:", error);
        }
    };

    const updateSearchHistory = (city) => {
        
        const filteredHistory = searchHistory.filter(item => item !== city);
        const updatedHistory = [city, ...filteredHistory].slice(0, 5);
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    const handleHistoryClick = (city) => {
        search(city);
        inputRef.current.value = city;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            search(inputRef.current.value);
        }
    };

    return (
        <div className='weather'>
            <div className='search-bar'>
                <input
                    ref={inputRef}
                    type='text'
                    placeholder='Search for a city'
                    onKeyPress={handleKeyPress}
                    aria-label="Search for a city"
                />
                <img
                    src={search_icon}
                    alt='Search Icon'
                    onClick={() => search(inputRef.current.value)}
                />
            </div>

            {/* Enhanced Greeting Message */}
            {!weatherData && !error && (
                <div className={`greeting-container ${greeting.background}`}>
                    <div className="greeting-content">
                        <img src={greeting.icon} alt="Weather icon" className="greeting-icon" />
                        <p className="greeting-message">{greeting.text}</p>
                    </div>
                </div>
            )}

            {/* Recent Cities */}
            {searchHistory.length > 0 && (
                <div className='recent-cities'>
                    <h3>Recent Cities</h3>
                    <div className='cities-list'>
                        {searchHistory.map((city, index) => (
                            <div
                                key={index}
                                className='city-item'
                                onClick={() => handleHistoryClick(city)}
                            >
                                {city}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Current Weather */}
            {weatherData ? (
                <>
                    <img src={weatherData.icon} alt='Weather Icon' className='weather-icon' />
                    <p className='temperature'>{weatherData.temperature}°C</p>
                    <p className='location'>{weatherData.location}</p>
                    <div className='weather-data'>
                        <div className='col'>
                            <img src={humidity_icon} alt='Humidity Icon' />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className='col'>
                            <img src={wind_icon} alt='Wind Icon' />
                            <div>
                                <p>{weatherData.windSpeed} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : error ? (
                <p className='error'>{error}</p>
            ) : null}
        </div>
    );
};

export default Weather;