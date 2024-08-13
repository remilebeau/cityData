"use client";
import { useState, useEffect } from "react";
import scrape from "@/api/scrape";

type CityData = {
  name: string;
  population: string;
  medianIncome: string;
  medianHomeValue: string;
  nearestCities: string;
};

export default function Home() {
  const [cityData, setCityData] = useState<CityData | null>(null);
  const fetchData = async () => {
    const data = await scrape();
    setCityData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="flex flex-col gap-4 p-4">
      {!cityData && <p>Loading...</p>}
      {cityData && (
        <section className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{cityData.name}</h1>
          <p>{cityData.population.split(". ")[0]}</p>
          <p>{cityData.population.split(". ")[1]}</p>
          <p>{cityData.medianIncome}</p>
          <p>{cityData.medianHomeValue}</p>
          <p>{cityData.nearestCities}</p>
        </section>
      )}
    </main>
  );
}
