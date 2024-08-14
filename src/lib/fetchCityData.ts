type CityData = {
  name: string;
  population: string;
  populationChange: string;
  medianIncome: string;
  medianHomeValue: string;
  nearestCities: string;
};

export default async function fetchCityData(
  city: string,
  state: string
): Promise<CityData> {
  const DATA_URL =
    process.env.NODE_ENV === "production"
      ? `https://citydata-api.onrender.com/api/citydata?city=${city}&state=${state}`
      : `http://localhost:8000/api/citydata?city=${city}&state=${state}`;
  const response = await fetch(DATA_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}
