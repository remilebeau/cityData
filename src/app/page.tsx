"use client";
import { useState } from "react";
import fetchCityData from "@/lib/fetchCityData";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderPinwheel, CircleX } from "lucide-react";

export default function Home() {
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [name, setName] = useState<string>();
  const [population, setPopulation] = useState<string>();
  const [populationChange, setPopulationChange] = useState<string>();
  const [medianIncome, setMedianIncome] = useState<string>();
  const [medianHomeValue, setMedianHomeValue] = useState<string>();
  const [crimeRate, setCrimeRate] = useState<string>();
  const [educationAndCommute, setEducationAndCommute] = useState<string[]>();
  const [nearestCities, setNearestCities] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>();

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
      crimeRate,
      educationAndCommute,
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
    setCrimeRate(crimeRate);
    setEducationAndCommute(educationAndCommute);
    setNearestCities(nearestCities);
  };
  return (
    <main className="flex flex-col gap-4 p-4 mx-auto max-w-4xl">
      {!name && (
        <section className="flex flex-col gap-4 p-4">
          <h1 className="text-4xl font-bold">City Data</h1>
          <p className="text-2xl">
            Enter a U.S. city and state to fetch some of its stats from{" "}
            <a
              className="text-blue-500 hover:opacity-80 font-bold"
              href="https://www.city-data.com/"
              target="_blank"
              rel="noreferrer"
            >
              City-Data
            </a>
            .
          </p>
          <p className="text-2xl">
            City-Data sees over 14 million users per month and has been featured
            in 121 books, on CNN, WABC in New York, Bay News 9 in Tampa Bay and
            USA Today&apos;s Hot Sites, among others.
          </p>
          <p className="text-2xl">
            Note: Not all U.S. cities are supported on this app. If a second
            request takes more than 10 seconds, please visit{" "}
            <a
              className="text-blue-500 hover:opacity-80 font-bold"
              href="https://www.city-data.com/"
              target="_blank"
              rel="noreferrer"
            >
              City-Data
            </a>{" "}
            directly.
          </p>
        </section>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <Label htmlFor="city">City:</Label>
        <Input
          className="text-black"
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
          className="text-black"
          type="text"
          name="state"
          id="state"
          onChange={(e) => {
            setState(e.target.value);
            setErrMsg("");
          }}
        />

        <Button type="submit">Submit</Button>
      </form>
      {errMsg && (
        <section className="flex flex-row gap-4 p-4">
          <CircleX className="text-red-500" />
          <p>{errMsg}</p>
        </section>
      )}
      {isLoading && (
        <section className="flex flex-col items-center gap-4 p-4">
          <LoaderPinwheel className="animate-spin" />
          <p className="text-2xl font-bold">Loading...</p>
          <p className="text-2xl font-bold">
            The first request may take up to 60 seconds.
          </p>
        </section>
      )}
      {name && (
        <Card className=" bg-black text-white">
          <CardHeader>
            <CardTitle>{name}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Population</h2>
            <p>{population}</p>
            <p>{populationChange}</p>
            <h2 className="text-xl font-bold">Income and Home Value</h2>
            <p>{medianIncome}</p>
            <p>{medianHomeValue}</p>
            {crimeRate && (
              <>
                <h2 className="text-xl font-bold">Crime</h2>
                <p>
                  Crime rate in 2022: {crimeRate} (The U.S. average is 246.1)
                </p>
              </>
            )}
            <h2 className="text-xl font-bold">Education and Commute</h2>
            {educationAndCommute?.map((education, index) => (
              <p key={index}>{education}</p>
            ))}
            <h2 className="text-xl font-bold">Nearest Cities</h2>
            <p>{nearestCities}</p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}
