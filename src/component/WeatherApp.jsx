import "./WeatherApp.css";
import React, { useState } from "react";
import search_icon from "../assets/search.png";
import N1 from "../assets/01D.png";
import N2 from "../assets/02D.png";
import N3 from "../assets/03D.png";
import N4 from "../assets/04D.png";
import N9 from "../assets/09D.png";
import N10 from "../assets/10D.png";
import N11 from "../assets/11D.png";
import N13 from "..//assets/13D.png";
import N50 from "..//assets/50D.png";
import humidity from "..//assets/humidity.png";
import wind from "../assets/wind.png";
import sunrise_icon from "../assets/Sunrise.png";
import sunset_icon from "../assets/Sunset.png";

const WeatherApp = () => {
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [icon, setIcon] = useState(N1);
  const [sunriseTime, setSunriseTime] = useState("");
  const [sunsetTime, setSunsetTime] = useState("");

  let api = "f241bc932930d02e22125e6175987d2f";

  const search = async () => {
    let api = "f241bc932930d02e22125e6175987d2f";

    const element = document.getElementsByClassName("searchbar");
    if (element[0].value === "") {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api}`;

    let response = await fetch(url);
    let data = await response.json();

    const degree = document.getElementsByClassName("degree");
    const humidity = document.getElementsByClassName("humidity-percent");
    const location = document.getElementsByClassName("location");
    const windspeed = document.getElementsByClassName("windspeed");
    const country = document.getElementsByClassName("country");

    //================================Sunrise and Sunset======================================///

    const sunsetDate = data.sys.sunrise;
    const sunriseDate = data.sys.sunset;
    const sunriseseconds = sunriseDate * 1000;
    const sunsetseconds = sunsetDate * 1000;
    const riseDate = new Date(sunriseseconds);
    const setSunDate = new Date(sunsetseconds);

    const optionsTime = {
      hour: "numeric",
      minute: "numeric",
    };

    const sunsetTimeString = setSunDate.toLocaleTimeString(
      "en-US",
      optionsTime
    );
    const sunriseTimeString = riseDate.toLocaleTimeString("en-US", optionsTime);

    setSunriseTime(sunriseTimeString);
    setSunsetTime(sunsetTimeString);

    //================================Sunrise and Sunset======================================///

    //Setting up Data to Temp, Humidity, WindSpeed, Country, Location
    degree[0].innerHTML = data.main.temp + " °C";
    humidity[0].innerHTML = data.main.humidity + " %";
    location[0].innerHTML = data.name;
    windspeed[0].innerHTML = data.wind.speed + " km/h";
    country[0].innerHTML = data.sys.country;

    //Weather Icon

    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setIcon(N1);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setIcon(N2);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setIcon(N3);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setIcon(N3);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setIcon(N4);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setIcon(N9);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setIcon(N10);
    } 
    else if (
      data.weather[0].icon === "11d" ||
      data.weather[0].icon === "11n"
    ) {
      setIcon(N11);
    }
    else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setIcon(N13);
    }
    else if (
      data.weather[0].icon === "50d" ||
      data.weather[0].icon === "50n"
    ) {
      setIcon(N50);
    }
    else {
      setIcon(N1);
    }

    // For Time and Date

    const currentDate = new Date();

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    setDate(currentDate.toLocaleDateString(undefined, options));
  };

  // For Enter Key

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      const element = document.getElementsByClassName("searchbar");
      if (element[0].value === "") {
        setError("Enter a location!");
        return 0;
      } else {
        search();
        setError("");
        element[0].value = "";
      }
    }
  };

  //======================================================================///

  return (
    <div className="container">
      <div className="box-container">
        <div className="weather-info">
          <div className="head">
            <input
              type="text"
              placeholder="Enter your location..."
              className="searchbar"
              onKeyPress={handleEnterKey}
            />
            <div
              className="search-img"
              onClick={() => {
                search();
              }}
            >
              <img src={search_icon} className="search-btn" />
            </div>
          </div>
          {error ? <p className="Error">{error}</p> : null}

          <div className="Date_Time">
            <div className="country"></div>
            <div className="date">{date}</div>
          </div>
          
          <div className="body">

              <div className="weather-img">
                <img src={icon} alt="" />
              </div>

              <div className="weather">
                <div className="degree"></div>
                <div className="location"></div>
              </div>
            
          </div>

          <div className="footer">

            <div className="element">
              <div className="element-data">
                <img src={humidity} alt="" />
                <div className="data">
                  <div className="humidity-percent"></div>
                  <p>Humidity</p>
                </div>
              </div>
            </div>

            <div className="element">
              <div className="element-data">
                <img src={wind} alt="" />
                <div className="data">
                  <div className="windspeed"></div>
                  <p>Wind</p>
                </div>
              </div>
            </div>

            <div className="element">
              <div className="element-data">
                <img src={sunset_icon} alt="" />
                <div className="data">
                  <div className="sunset">{sunsetTime}</div>
                  <p>Sunset</p>
                </div>
              </div>
            </div>

            <div className="element">
              <div className="element-data">
                <img src={sunrise_icon} alt="" />
                <div className="data">
                  <div className="sunrise">{sunriseTime}</div>
                  <p>Sunrise</p>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
