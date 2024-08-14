"use client";
import { useState } from "react";
import fetchCityData from "@/lib/fetchCityData";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
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
    } = await fetchCityData(city, state);
    if (!name) {
      setErrMsg("City not found. Please check spelling and try again.");
      setIsLoading(false);
      return;
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
      <section className="flex flex-col gap-4 p-4">
        <h1 className="text-4xl font-bold">City Data</h1>
        <p className="text-2xl">
          Enter a city and state to fetch its population, income, and nearest
          city stats from{" "}
          <a
            className="text-blue-500 hover:opacity-80 font-bold"
            href="https://www.city-data.com/"
            target="_blank"
            rel="noreferrer"
          >
            City-Data
          </a>
        </p>
      </section>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label htmlFor="city">City:</Label>
        <Input
          type="text"
          name="city"
          id="city"
          onChange={(e) => {
            setCity(e.target.value);
            setErrMsg("");
          }}
        />

        <Label>State:</Label>
        <Input
          type="text"
          name="state"
          id="state"
          onChange={(e) => {
            setState(e.target.value);
            setErrMsg("");
          }}
        />

        <Button className="bg-primary" type="submit">
          Submit
        </Button>
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
