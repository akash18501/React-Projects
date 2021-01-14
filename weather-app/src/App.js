import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";
import { day, night } from "./data";
import { Button } from "@material-ui/core";
import CircularIndeterminate from "./components/Loader";

const API_KEY = "c440802c117290764c122da7d50dc54f";
const units = "metric";

const findsunsetsunrise = (unix) => {
  let unix_timestamp = unix;
  // Create a new JavaScript Date object based on the timestamp
  // multiplied by 1000 so that the argument is in milliseconds, not seconds.
  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getUTCHours();
  // Minutes part from the timestamp
  var minutes = date.getUTCMinutes();

  return [parseInt(hours), parseInt(minutes)];
};

function App() {
  const [cityName, setCityName] = useState("");
  const [imageCode, setImageCode] = useState("");
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [sunrise, setSunrise] = useState(null);
  const [weatherbackground, setWeatherbaackground] = useState("");

  const imageBaseUrl = `http://openweathermap.org/img/wn/${imageCode}@2x.png`;

  useEffect(() => {
    console.log("sun rise insde calculate is", sunrise);
    let backgroundclass = "";
    if (sunrise === true) {
      backgroundclass = backgroundclass + "day";
    } else backgroundclass = backgroundclass + "night";

    if (data.weather) {
      if (data.weather[0].description.includes("rain")) {
        backgroundclass = backgroundclass + "rain";
      } else if (data.weather[0].description.includes("clouds")) {
        backgroundclass = backgroundclass + "clouds";
      } else if (data.weather[0].description.includes("thunder")) {
        backgroundclass = backgroundclass + "thunder";
      } else if (data.weather[0].description.includes("clear")) {
        backgroundclass = backgroundclass + "clear";
      } else if (data.weather[0].description.includes("mist")) {
        backgroundclass = backgroundclass + "mist";
      } else if (data.weather[0].description.includes("fog")) {
        backgroundclass = backgroundclass + "mist";
      } else if (data.weather[0].description.includes("snow")) {
        backgroundclass = backgroundclass + "snow";
      } else {
        backgroundclass = backgroundclass + "haze";
      }
    }
    console.log("background class is", backgroundclass);
    setWeatherbaackground(backgroundclass);
  }, [sunrise]);

  useEffect(() => {
    //getting the UTC hours minutes and seconds
    let d = new Date();
    let h = d.getUTCHours();
    let m = d.getUTCMinutes();
    let s = d.getUTCSeconds();

    //gettting the timezone offset in seconds of the searched city
    let timezone = data.timezone;
    timezone = timezone / 60;

    //finding the offset hours and minutes of the current city
    let hours = Math.floor(timezone / 60);
    let minutes = timezone % 60;

    //finding the local hours and minutes time of the current city
    // let localminutes = (m + minutes) % 60;
    // let localhours =
    //  Math.floor(h + hours + Math.floor((m + minutes) / 60)) % 24;
    let localhours = h + hours;
    let localminutes = m + minutes;

    if (localminutes < 0) {
      localhours = localhours - 1;
      localminutes = localminutes + 60;
    } else if (localminutes > 60) {
      localhours = localhours + 1;
      localminutes = localminutes % 60;
    }
    if (localhours < 0) {
      localhours = localhours + 24;
    } else if (localhours > 24) {
      localhours = localhours % 24;
    }

    console.log("local hours", localhours);
    console.log("local minutes", localminutes);

    let sunrisehours, sunriseminutes, sunsethours, sunsetminutes;
    //finding the sunset time
    if (data.sys) {
      [sunrisehours, sunriseminutes] = findsunsetsunrise(data.sys.sunrise);
      //converting sunrise hours to the searched city timezone
      sunrisehours = sunrisehours + hours;
      sunriseminutes = sunriseminutes + minutes;
      if (sunriseminutes < 0) {
        sunrisehours = sunrisehours - 1;
        sunriseminutes = sunriseminutes + 60;
      } else if (sunriseminutes > 60) {
        sunrisehours = sunrisehours + 1;
        sunriseminutes = sunriseminutes % 60;
      }
      if (sunrisehours < 0) {
        sunrisehours = sunrisehours + 24;
      } else if (sunrisehours > 24) {
        sunrisehours = sunrisehours % 24;
      }
      [sunsethours, sunsetminutes] = findsunsetsunrise(data.sys.sunset);
      //converting the sunset hours to the searched city timezone
      sunsethours = sunsethours + hours;
      sunsetminutes = sunsetminutes + minutes;
      if (sunsetminutes < 0) {
        sunsethours = sunsethours - 1;
        sunsetminutes = sunsetminutes + 60;
      } else if (sunsetminutes > 60) {
        sunsethours = sunsethours + 1;
        sunsetminutes = sunsetminutes % 60;
      }
      if (sunsethours < 0) {
        sunsethours = sunsethours + 24;
      } else if (sunsethours > 24) {
        sunsethours = sunsethours % 24;
      }
    }

    console.log("sunrise", sunrisehours, sunriseminutes);
    console.log("sunset", sunsethours, sunsetminutes);

    if (localhours >= sunrisehours && localhours <= sunsethours) {
      setSunrise(true);
    } else setSunrise(false);
  }, [data]);

  useEffect(() => {
    const callapi = async () => {
      const response = await Axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}
        `
      );
      console.log("data is", response.data);
      setData(response.data);
      setLoading(false);
    };

    callapi();
  }, [cityName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setCityName(input);
    setSunrise(null);
    setInput("");
  };

  return (
    <div className={`App ${weatherbackground}`}>
      <div className="weather__container">
        {/* weather display part */}
        <div className="weather__display">
          {loading ? (
            <CircularIndeterminate />
          ) : cityName ? (
            <div className="weather__display__inner">
              <h1 className="weather__display__cityname">{data.name}</h1>
              <div className="weather__display__imagewrapper">
                <img
                  src={`http://openweathermap.org/img/wn/${
                    sunrise
                      ? day[data.weather[0].description]
                      : night[data.weather[0].description]
                  }@4x.png`}
                  alt="weatherimage"
                  className="weather__display__image"
                />
              </div>
              <h2 className="weather__display__desc">
                {data.weather[0].description}
              </h2>
              <div className="weather_display_temperature">
                <div className="actual">
                  <h2>temp</h2>
                  <h2>{data.main.temp}&#xb0; C</h2>
                </div>
                <div className="feels__like">
                  <h2>feels like</h2>
                  <h2>{data.main.feels_like}&#xb0; C</h2>
                </div>
              </div>
            </div>
          ) : (
            <h1>Search for weather on right</h1>
          )}
        </div>
        {/* weather search part */}
        <div className="weather__search">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="input">City Name</label>
              <input
                type="text"
                placeholder="enter the name of the city"
                id="input"
                value={input}
                autoComplete="off"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>

            <Button
              style={{
                backgroundColor: "#1D2951",
                color: "white",
              }}
              type="submit"
            >
              Find Weather
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
