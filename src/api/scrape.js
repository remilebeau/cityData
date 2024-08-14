"use server";
import puppeteer from "puppeteer";

export default async function scrape(city, state) {
  // format city
  city = city.replace(" ", "-");
  // format state
  if (state.length == 2) {
    state = state.toUpperCase();
    const states = {
      AL: "Alabama",
      AK: "Alaska",
      AS: "American Samoa",
      AZ: "Arizona",
      AR: "Arkansas",
      CA: "California",
      CO: "Colorado",
      CT: "Connecticut",
      DE: "Delaware",
      DC: "District Of Columbia",
      FM: "Federated States Of Micronesia",
      FL: "Florida",
      GA: "Georgia",
      GU: "Guam",
      HI: "Hawaii",
      ID: "Idaho",
      IL: "Illinois",
      IN: "Indiana",
      IA: "Iowa",
      KS: "Kansas",
      KY: "Kentucky",
      LA: "Louisiana",
      ME: "Maine",
      MH: "Marshall Islands",
      MD: "Maryland",
      MA: "Massachusetts",
      MI: "Michigan",
      MN: "Minnesota",
      MS: "Mississippi",
      MO: "Missouri",
      MT: "Montana",
      NE: "Nebraska",
      NV: "Nevada",
      NH: "New Hampshire",
      NJ: "New Jersey",
      NM: "New Mexico",
      NY: "New York",
      NC: "North Carolina",
      ND: "North Dakota",
      MP: "Northern Mariana Islands",
      OH: "Ohio",
      OK: "Oklahoma",
      OR: "Oregon",
      PW: "Palau",
      PA: "Pennsylvania",
      PR: "Puerto Rico",
      RI: "Rhode Island",
      SC: "South Carolina",
      SD: "South Dakota",
      TN: "Tennessee",
      TX: "Texas",
      UT: "Utah",
      VT: "Vermont",
      VI: "Virgin Islands",
      VA: "Virginia",
      WA: "Washington",
      WV: "West Virginia",
      WI: "Wisconsin",
      WY: "Wyoming",
    };
    state = states[state] || state;
  }
  state = state.replace(" ", "-");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = `https://www.city-data.com/city/${city}-${state}.html`;
  await page.goto(url);
  const cityData = await page.evaluate(() => {
    const name = document.querySelector("h1")?.textContent?.trim();
    if (name === "Oops, Page Not Found!") {
      return {
        error: "City not found. Please check your spelling and try again.",
      };
    }
    const population = document
      .querySelector(".city-population")
      ?.textContent?.trim()
      .split(". ")[0];
    const populationChange = document
      .querySelector(".city-population")
      ?.textContent?.trim()
      .split(". ")[1];
    const medianIncome = document
      .querySelector(".median-income")
      ?.textContent?.split("\n")[0]
      .trim();
    const medianHomeValue = document
      .querySelector(".median-income")
      ?.textContent?.split("\n")[4]
      .trim();
    const nearestCities = document
      .querySelector(".nearest-cities")
      ?.textContent?.trim();
    return {
      name,
      population,
      populationChange,
      medianIncome,
      medianHomeValue,
      nearestCities,
    };
  });
  await browser.close();
  return cityData;
}
