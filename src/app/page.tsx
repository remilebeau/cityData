"use client";
import { useState } from "react";
import scrape from "@/api/scrape";

export default function Home() {
  const [city, setCity] = useState<string>();
  const [state, setState] = useState<string>();
  const [name, setName] = useState<string | undefined>();
  const [population, setPopulation] = useState<string | undefined>();
  const [populationChange, setPopulationChange] = useState<
    string | undefined
  >();
  const [medianIncome, setMedianIncome] = useState<string | undefined>();
  const [medianHomeValue, setMedianHomeValue] = useState<string | undefined>();
  const [nearestCities, setNearestCities] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string | undefined>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrMsg("");
    const {
      name,
      population,
      populationChange,
      medianIncome,
      medianHomeValue,
      nearestCities,
      error,
    } = await scrape(city, state);
    if (error) {
      setIsLoading(false);
      setErrMsg("City not found. Please check your spelling and try again.");
    }
    setIsLoading(false);
    setName(name);
    setPopulation(population);
    setPopulationChange(populationChange);
    setMedianIncome(medianIncome);
    setMedianHomeValue(medianHomeValue);
    setNearestCities(nearestCities);
  };
  return (
    <main className="flex flex-col gap-4 p-4 mx-auto max-w-4xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="city">City:</label>
        <input
          type="text"
          name="city"
          id="city"
          onChange={(e) => {
            setCity(e.target.value);
            setErrMsg("");
          }}
          className="text-black border rounded p-2"
        />

        <label>State:</label>
        <input
          type="text"
          name="state"
          id="state"
          onChange={(e) => {
            setState(e.target.value);
            setErrMsg("");
          }}
          className="text-black border rounded p-2"
        />

        <button
          className="border rounded p-2 bg-gray-800 hover:bg-gray-700"
          type="submit"
        >
          Submit
        </button>
      </form>
      {errMsg && <p>{errMsg}</p>}
      {isLoading && <p>Loading...</p>}
      {name && (
        <section className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{name}</h1>
          <p>{population}</p>
          <p>{populationChange}</p>
          <p>{medianIncome}</p>
          <p>{medianHomeValue}</p>
          <p>{nearestCities}</p>
        </section>
      )}
    </main>
  );
}
