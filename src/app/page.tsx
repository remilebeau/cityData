"use client";
import { useState } from "react";
import scrape from "@/api/scrape";

type CityData = {
  name: string;
  population: string;
  populationChange: string;
  medianIncome: string;
  medianHomeValue: string;
  nearestCities: string;
};

export default function Home() {
  const [cityData, setCityData] = useState<CityData | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const data = await scrape(city, state);
    setCityData(data);
  };
  return (
    <main className="flex flex-col gap-4 p-4">
      <form onSubmit={handleSubmit}>
        <label>
          City:
          <input
            type="text"
            name="city"
            id="city"
            className="text-black border rounded p-2"
          />
        </label>
        <label>
          State:
          <input
            type="text"
            name="state"
            id="state"
            className="text-black border rounded p-2"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {!cityData && <p>Loading...</p>}
      {cityData && (
        <section className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{cityData.name}</h1>
          <p>{cityData.population}</p>
          <p>{cityData.populationChange}</p>
          <p>{cityData.medianIncome}</p>
          <p>{cityData.medianHomeValue}</p>
          <p>{cityData.nearestCities}</p>
        </section>
      )}
    </main>
  );
}
