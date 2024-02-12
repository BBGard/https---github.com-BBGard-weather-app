"use client";

import React, { useState } from "react";
import { FaSun } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import SearchBox from "./SearchBox";
import axios from "axios";
import { useAtom } from "jotai";
import { placeAtom } from "@/app/atom";
import { loadingCityAtom } from "@/app/atom";

type Props = { location?: string };

export default function Navbar(props: Props) {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [place, setPlace] = useAtom(placeAtom);
  const [loadingCity, setLoadingCity] = useAtom(loadingCityAtom);

  /**
   * Handle input change for search form.
   * @param item
   */
  const handleInputChange = async (value: string) => {
    setLocation(value);

    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
        );

        const data = response.data.list.map(
          (item: any) => `${item.name}, ${item.sys.country}`
        );

        console.log("data: ", data);

        setSuggestions(data);
        setShowSuggestions(true);
        setError("");
      } catch (error: any) {
        setSuggestions([]);
        setShowSuggestions(false);
        setError(error);
      }
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  /**
   * Handle search form submit.
   * @param e FormEvent
   */
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoadingCity(true);

    // Prevent refresh
    e.preventDefault();

    if (suggestions.length === 0) {
      setError("No location found");
      setLoadingCity(false);
    } else {
      setError("");

      setTimeout(() => {
        setShowSuggestions(false);
        setPlace(location);
        setLoadingCity(false);
      }, 500);
    }
  };

  /**
   * Handle suggestion click.
   * @param item string
   */
  const handleSuggestionClick = (item: string) => {
    setLoadingCity(true);

    setLocation(item);
    setShowSuggestions(false);

    setTimeout(() => {
      setPlace(location);
      setLoadingCity(false);
    }, 500);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (postiion) => {
        const { latitude, longitude } = postiion.coords;
        try {
          setLoadingCity(true);
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
          );
          setTimeout(() => {
            setLoadingCity(false);
            setPlace(response.data.name);
          }, 500);
        } catch (error) {
          setLoadingCity(false);
        }
      });
    }
  };

  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <FaSun className="text-yellow-300 text-3xl" />
        </div>

        <section className="flex gap-2 items-center">
          <FaLocationCrosshairs
            title="Get Current Location"
            onClick={handleGetCurrentLocation}
            className="text-gray-400 text-2xl hover:opacity-80 cursor-pointer"
          />
          <FaLocationDot className="text-gray-400 text-2xl" />
          <p className="text-slate-900/80 text-sm">{props.location}</p>
          <div className="relative">
            <SearchBox
              value={location}
              onChange={(e) => handleInputChange(e.target.value)}
              onSubmit={handleSearchSubmit}
            />
            <SuggestionBox
              {...{
                showSuggestions,
                suggestions,
                handleSuggestionClick,
                error,
              }}
            />
          </div>
        </section>
      </div>
    </nav>
  );
}

function SuggestionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {



  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1 "> {error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded   hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
