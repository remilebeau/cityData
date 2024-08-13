"use server";
import puppeteer from "puppeteer";

export default async function scrape() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `https://www.city-data.com/city/Columbus-Ohio.html`;
  await page.goto(url);
  const cityData = await page.evaluate(() => {
    const name = document.querySelector("h1").textContent.trim();
    const population = document
      .querySelector(".city-population")
      .textContent.trim();
    const medianIncome = document
      .querySelector(".median-income")
      .textContent.split("\n")[0]
      .trim();
    const medianHomeValue = document
      .querySelector(".median-income")
      .textContent.split("\n")[4]
      .trim();
    const nearestCities = document
      .querySelector(".nearest-cities")
      .textContent.trim();
    return {
      name,
      population,
      medianIncome,
      medianHomeValue,
      nearestCities,
    };
  });
  await browser.close();
  return cityData;
}
