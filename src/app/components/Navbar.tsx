import React from "react";
import { FaSun } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import SearchBox from "./SearchBox";

type Props = {};

export default function Navbar(props: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <FaSun className="text-yellow-300 text-3xl" />
        </div>

        <section className="flex gap-2 items-center">
          <FaLocationCrosshairs className="text-gray-400 text-2xl hover:opacity-80 cursor-pointer" />
          <FaLocationDot className="text-gray-400 text-2xl hover:opacity-80 cursor-pointer" />
          <p className="text-slate-900/80 text-sm">Melbourne</p>
          <div>
            <SearchBox />
          </div>
        </section>
      </div>
    </nav>
  );
}
