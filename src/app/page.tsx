"use client";
import { useState, useEffect } from "react";
import scrape from "@/api/scrape";

export default function Home() {
  const [cityData, setCityData] = useState({});
  const fetchData = async () => {
    const data = await scrape();
    setCityData(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div>{JSON.stringify(cityData)}</div>;
}
