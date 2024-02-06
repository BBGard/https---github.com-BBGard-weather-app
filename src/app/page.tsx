"use client";

import Navbar from "./components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { formatDate, parseISO } from "date-fns";

// Current weather for Melbourne (lat/long)
// https://api.openweathermap.org/data/2.5/weather?lat=-37.813629&lon=144.963058&units=metric&appid=3e40f30af9bf99781c4432c8911b05cf
// https://api.openweathermap.org/data/2.5/weather?lat=-37.813629&lon=144.963058&units=metric&appid=process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY

// 3hour/5day forecast for Melbourne (lat/long)
// https://api.openweathermap.org/data/2.5/forecast?lat=-37.813629&lon=144.963058&units=metric&appid=3e40f30af9bf99781c4432c8911b05cf
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
        {/* Todays Forecast */}
        <section>
          <div>
            <h2 className="flex gap-1 text-2xl items-end">
              {formatDate(parseISO(forecastData?.dt_txt ?? ""), "EEEE, d MMMM")}
            </h2>
            <div>

            </div>
          </div>
        </section>
        {/* 5-day Forecast */}
        <section></section>
      </main>
    </div>
  );
}
