"use client";
import { useState } from "react";
import fetchCityData from "@/lib/fetchCityData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoaderPinwheel, CircleX } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define form schema
const formSchema = z.object({
  city: z.string().min(2),
  state: z.string().length(2),
});

export default function Home() {
  // Define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      state: "",
    },
  });

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrMsg("");
    const { city, state } = values;
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
  }
  // State for fetched data
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input className="rounded-xl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input className="rounded-xl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="rounded-xl w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
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
        <Card>
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
