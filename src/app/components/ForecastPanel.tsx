import React from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";
import {SingleWeatherDetail} from "./SingleWeatherDetail";
import { BsFillSunriseFill } from "react-icons/bs";
import { BsFillSunsetFill } from "react-icons/bs";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";


export interface ForecastPanelProps {
  icon: string;
  day: string;
  date: string;
  description: string;
  sunrise: string;
  sunset: string;
  temp_min: number;
  temp_max: number;
}

export default function ForecastPanel(props: ForecastPanelProps) {
  const {
    icon = "01d",
    day = "Monday",
    date = "01/01/2021",
    description = "Clear sky",
    temp_min = 0,
    temp_max = 0,
  } = props;

  return (
    <Container className="flex flex-col gap-4">
      <section className="px-4">
        <p className="text-m">
          {day} {date}
        </p>
      </section>

        <section className="flex items-center gap-10 px-4">
          <div className="flex flex-col items-center">
            <p className="capitalize"> {description}</p>
            <WeatherIcon iconname={props.icon} />
          </div>


          {/* <div >
            <p className="text-xl">Min: {temp_min.toFixed(0)} °C</p>
            <p className="text-xl">Max: {temp_max.toFixed(0)} °C</p>
          </div> */}

          <SingleWeatherDetail
            icon={<FaCaretDown />}
            information="Min"
            value={temp_min.toFixed(0) + " °C"}
          />

          <SingleWeatherDetail
            icon={<FaCaretUp />}
            information="Max"
            value={temp_max.toFixed(0) + " °C"}
          />

          <SingleWeatherDetail
            icon={<BsFillSunriseFill />}
            information="Sunrise"
            value={props.sunrise}
          />

          <SingleWeatherDetail
            icon={<BsFillSunsetFill />}
            information="Sunset"
            value={props.sunset}
          />
        </section>
   </Container>
  );
}
