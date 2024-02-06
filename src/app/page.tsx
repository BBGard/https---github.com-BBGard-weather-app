"use client";

import Navbar from "./components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { formatDate, parseISO } from "date-fns";
import Container from "./components/Container";
import WeatherIcon from "./components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";

// Current weather for Melbourne (lat/long)
// https://api.openweathermap.org/data/2.5/weather?lat=-37.813629&lon=144.963058&units=metric&appid=process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY

// 3hour/5day forecast for Melbourne (lat/long)
// https://api.openweathermap.org/data/2.5/forecast?lat=-37.813629&lon=144.963058&units=metric&appid=process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY

/**
 * Represents the weather data returned from the API.
 */
type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

/**
 * Represents a single weather entry in the 5-day forecast.
 */
type WeatherEntry = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: WeatherCondition[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

/**
 * Represents a single weather condition.
 */
type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=-37.813629&lon=144.963058&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
      );
      return data;
    }
  );

  const forecastData = data?.list[0];

  console.log("data: ", data);

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="text-2xl animate-bounce">Loading...</p>
      </div>
    );

  // if (error) return 'An error has occurred: ' + (error as Error).message;

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">

        <section className="space-y-4">
          <div className="space-y-2">

            {/* Date */}
            <h2 className="flex gap-1 text-2xl items-end">
              {formatDate(parseISO(forecastData?.dt_txt ?? ""), "EEEE, d MMMM")}
            </h2>

            {/* Today */}
            <Container className="gap px-6 items-center">
              <div className="flex flex-col px-4">

                {/* Current Temperature */}
                {/* <WeatherIcon iconName={getDayOrNightIcon(forecastData?.weather[0].icon ?? "", forecastData?.dt_txt ?? "")} /> */}

                <span className="text-5xl whitespace-nowrap">
                  {forecastData?.main.temp.toFixed(0) ?? 0} °C
                </span>


                {/* Feels Like Temperature */}
                <span>
                  Feels like {forecastData?.main.feels_like.toFixed(0) ?? 0} °C
                </span>

                {/* Description */}
                <p className="text-xs space-x-1 whitespace-nowrap">
                  <span >
                    {forecastData?.weather[0].description
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </span>
                </p>

                {/* Min/Max Temps */}
                <p className="text-xs space-x-2 whitespace-nowrap">
                  <span>
                    Min: {forecastData?.main.temp_min.toFixed(0) ?? 0} °C
                  </span>
                  <span>
                    Max: {forecastData?.main.temp_max.toFixed(0) ?? 0} °C
                  </span>
                </p>
              </div>

              {/* Time and weather icons */}
              <div className="flex px-4 gap-10 sm:gap-16 overflow-x-auto w-full justify-between">
                {data?.list.map((entry, index) => {

                  {/* Only map todays data */}
                  const entryDate = parseISO(entry.dt_txt);
                  const isToday = entryDate.getDate() === new Date().getDate();
                  const isBetween6AMAnd12AM = entryDate.getHours() >= 6 && entryDate.getHours() <= 24;

                  if (isToday && isBetween6AMAnd12AM) {
                    return (
                      <div
                        key={index}
                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                      >
                        {/* Weather Icon */}
                        <WeatherIcon iconName={getDayOrNightIcon(entry.weather[0].icon, entry.dt_txt)} />

                        {/* Temperature */}
                        <span>{entry.main.temp.toFixed(0)} °C</span>

                        {/* Time */}
                        <p className="whitespace-nowrap">
                          {formatDate(parseISO(entry.dt_txt), "h:mm a")}
                        </p>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            </Container>
          </div>
        </section>

        {/* 5-day Forecast */}
        <section className="flex w-full flex-col gap-4">
        <p className="text-2xl">5-day Forecast</p>
        </section>
      </main>
    </div>
  );
}
