import React from "react";
import { FaEye } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { BsFillSunriseFill } from "react-icons/bs";
import { BsFillSunsetFill } from "react-icons/bs";
import { IoIosSpeedometer } from "react-icons/io";
import { SingleWeatherDetail } from "./SingleWeatherDetail";


export interface WeatherDetailsProps {
  visibility?: string;
  humidity?: string;
  windSpeed?: string;
  airPressure?: string;
  sunrise?: string;
  sunset?: string;
}

export default function WeatherDetails(props: WeatherDetailsProps) {

  const {
    visibility,
    humidity,
    windSpeed,
    airPressure,
    sunrise,
    sunset,
  } = props;


  return (
    <>
      {visibility && (
        <SingleWeatherDetail
          icon={<FaEye />}
          information="Visibility"
          value={visibility}
        />
      )}
      {humidity && (
        <SingleWeatherDetail
          icon={<FaDroplet />}
          information="Humidity"
          value={humidity}
        />
      )}
      {windSpeed && (
        <SingleWeatherDetail
          icon={<FaWind />}
          information="Wind Speed"
          value={windSpeed}
        />
      )}
      {airPressure && (
        <SingleWeatherDetail
          icon={<IoIosSpeedometer />}
          information="Air Pressure"
          value={airPressure}
        />
      )}
      {sunrise && (
        <SingleWeatherDetail
          icon={<BsFillSunriseFill />}
          information="Sunrise"
          value={sunrise}
        />
      )}
      {sunset && (
        <SingleWeatherDetail
          icon={<BsFillSunsetFill />}
          information="Sunset"
          value={sunset}
        />
      )}
    </>
  );
}
