import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "./Images/pngwing.com.png";
import sunImg from './Images/animation_500_kxbnk14g.gif';
import suncloudImg from './Images/sun_cloud.gif'
import dayrainImg from './Images/day-rain.gif';

const Navbar = () => {
  // const [lat, setLat] = useState(null);
  // const [long, setLong] = useState(null);
  const [data, setData] = useState(null);
  const [time, setTime] = useState(null);
  const getData = async(latitude, longitude) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${(latitude)? latitude : '22.3072'}&lon=${(longitude)? longitude : '73.1812'}&appid=ba8ec612bcfe700c69ebf0ba2dcf5156`
    ).then((res) => res.json())
      .then((result) => {
        setData(result);
        // console.log(result);
        // console.log(result.weather[0].main);
        // console.log(result.name)
      })
  }
  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      // setLat(position.coords.latitude);
      // setLong(position.coords.longitude);
      getData(position.coords.latitude, position.coords.longitude);
    });
  }
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=28.7041&lon=77.1025&appid=ba8ec612bcfe700c69ebf0ba2dcf5156`
    ).then((res) => res.json())
      .then((result) => {
        setData(result);
        // console.log(result);
        // console.log(result.weather[0].main);
        // console.log(result.name)
      })
      getLocation();
    let today = new Date();
    setTime(today.getHours());
  }, []);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={image} alt="" className="symbol" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link" >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/business" className="nav-link" >
                  Business
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/politics" className="nav-link" >
                  Politics
                </Link>
              </li> */}
              <li className="nav-item">
                <Link to="/sports" className="nav-link" >
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/entertainment" className="nav-link" >
                  Entertainment
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/technology" className="nav-link" >
                  Technology
                </Link>
              </li>
            </ul>
          </div>
          <div className="weather_sec">
            {data && (
              <div className="weather_data" style={{ color: "#fff" }}>
                <div className="image">
                  <img
                    className="weather_image"
                    src={
                      time > 18 || time < 6
                        ? data.weather[0].main === "Cloud"
                          ? "https://icons.iconarchive.com/icons/large-icons/large-weather/512/cloudy-night-icon.png"
                          : data.weather[0].main === "Rain"
                            ? "https://cdn-icons.flaticon.com/png/512/2469/premium/2469994.png?token=exp=1639589556~hmac=17480b6b55b1809eba7e3bf16b2b9c2f"
                            : "https://cdn-icons-png.flaticon.com/512/581/581601.png"
                        : data.weather[0].main !== "Clouds"
                          ? `${suncloudImg}`
                          : data.weather[0].main === "Rain"
                            ? `${dayrainImg}`
                            : `${sunImg}`
                    }
                    alt="Weather_Image"
                  />
                </div>
                <div className="weather_feel" style={{ color: "#f2f2f2" }}>
                  <div className="weather_main">
                    {data.weather[0].main}
                  </div>
                  <div className="weather_temp">
                    {data.name}   {Math.ceil(data.main.temp - 272.15)}° C
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
