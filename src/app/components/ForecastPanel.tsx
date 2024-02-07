import React from "react";
import Container from "./Container";

type Props = {};

export default function ForecastPanel({}: Props) {
  return (
    <Container>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Next 7 days</h2>
        <div className="grid grid-cols-7 gap-4 mt-4">
          <div className="flex flex-col items-center">
            <p className="text-sm">Mon</p>
            <p className="text-sm">25°C</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">Tue</p>
            <p className="text-sm">25°C</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">Wed</p>
            <p className="text-sm">25°C</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">Thu</p>
            <p className="text-sm">25°C</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">Fri</p>
            <p className="text-sm">25°C</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">Sat</p>
            <p className="text-sm">25°C</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-sm">Sun</p>
            <p className="text-sm">25°C</p>
          </div>
        </div>
      </div>
    </Container>
  );

}
