import React from "react";
import { FaEye } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { BsFillSunriseFill } from "react-icons/bs";
import { BsFillSunsetFill } from "react-icons/bs";
import { IoIosSpeedometer } from "react-icons/io";


export interface WeatherDetailsProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails(props: WeatherDetailsProps) {

  const {
    visibility = "0km",
    humidity = "0%",
    windSpeed = "0km/h",
    airPressure = "0hPa",
    sunrise = "00:00",
    sunset = "00:00",
  } = props;


  return (
    <>
      <SingleWeatherDetail
        icon={<FaEye />}
        information="Visibility"
        value={visibility}
      />
      <SingleWeatherDetail
        icon={<FaDroplet />}
        information="Humidity"
        value={humidity}
      />
      <SingleWeatherDetail
        icon={<FaWind />}
        information="Wind Speed"
        value={windSpeed}
      />
      <SingleWeatherDetail
        icon={<IoIosSpeedometer />}
        information="Air Pressure"
        value={airPressure}
      />
      <SingleWeatherDetail
        icon={<BsFillSunriseFill />}
        information="Sunrise"
        value={sunrise}
      />
      <SingleWeatherDetail
        icon={<BsFillSunsetFill />}
        information="Sunset"
        value={sunset}
      />
    </>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

export function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}
