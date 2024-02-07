"use client";

import Navbar from "./components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { formatDate, fromUnixTime, parseISO } from "date-fns";
import Container from "./components/Container";
import WeatherIcon from "./components/WeatherIcon";
import { getDayOrNightIcon } from "@/utils/getDayOrNightIcon";
import WeatherDetails from "./components/WeatherDetails";
import metersToKilometers from "@/utils/metersToKilometers";
import { off } from "process";

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



  function getUpdatedFormattedTime(data: WeatherData | undefined): string {
    const offsetInSeconds = data?.city.timezone ?? 36000;

    const parsedDate = new Date(data?.list[0].dt_txt ?? "");
    // Apply the offset to get the UTC timestamp
    const utcTimestamp = parsedDate.getTime() + parsedDate.getTimezoneOffset() * 60000;

    // Apply the local timezone offset
    const localTimestamp = utcTimestamp + offsetInSeconds * 1000;

    // Create a new Date object with the local timestamp
    const localDate = new Date(localTimestamp);

    // Add 11 hours to the time
    localDate.setHours(localDate.getHours() + offsetInSeconds / 3600);

    // Format the updated local date as a string
    const updatedFormattedTime = formatDate(localDate, "h:mm a");

    return updatedFormattedTime;
  }

  console.log("formattedTime: ", getUpdatedFormattedTime(data));







  // const localTime = formatDate(parseISO(data?.list[0].dt_txt ?? ""), "h:mm a")

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
            <Container className="gap-1 px-6 items-center">
              <div className="flex flex-col px-4 gap-1">
                {/* Current Temperature */}
                {/* <WeatherIcon iconName={getDayOrNightIcon(forecastData?.weather[0].icon ?? "", forecastData?.dt_txt ?? "")} /> */}

                <span className="whitespace-nowrap flex flex-row items-center gap-2">
                  <p className="text-2xl">{"🌡"}</p>
                  <p className="text-5xl ">
                    {forecastData?.main.temp.toFixed(0) ?? 0} °C
                  </p>
                </span>

                {/* Feels Like Temperature */}
                <span>
                  Feels like {forecastData?.main.feels_like.toFixed(0) ?? 0} °C
                </span>

                {/* Description */}
                {/* <p className="text-xs space-x-1 whitespace-nowrap">
                  <span>
                    {forecastData?.weather[0].description
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </span>
                </p> */}

                {/* Min/Max Temps */}
                <p className="text-xs flex flex-col  whitespace-nowrap gap-1">
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
                  {
                    /* Only map todays data */
                  }
                  const entryDate = parseISO(entry.dt_txt);
                  const isToday = entryDate.getDate() === new Date().getDate();
                  const isBetween1AMAnd12AM =
                    entryDate.getHours() >= 1 && entryDate.getHours() <= 24;

                  if (isToday && isBetween1AMAnd12AM) {
                    return (
                      <div
                        key={index}
                        className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                      >
                        {/* Weather Icon */}
                        <WeatherIcon
                          iconname={getDayOrNightIcon(
                            entry.weather[0].icon,
                            entry.dt_txt
                          )}
                        />

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
          <div className="flex gap-4">
            {/* LEft */}
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="capitalize text-center">
                {forecastData?.weather[0].description}
              </p>
              <WeatherIcon
                iconname={getDayOrNightIcon(
                  forecastData?.weather[0].icon ?? "",
                  forecastData?.dt_txt ?? ""
                )}
              />
            </Container>
            {/* Right */}
            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
              <WeatherDetails
                visibility={`${metersToKilometers(forecastData?.visibility ?? 0)} km`}
                humidity={`${forecastData?.main.humidity.toString()} %` ?? ""}
                windSpeed={`${forecastData?.wind.speed.toString()} km/h` ?? ""}
                airPressure={`${forecastData?.main.pressure.toString()} hPa`?? ""}
                sunrise={formatDate(fromUnixTime(data?.city.sunrise ?? 0), "h:mm a")}
                sunset={formatDate(fromUnixTime(data?.city.sunset ?? 0), "h:mm a")}
              />
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
