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
  const response = await fetch(
    `http://localhost:8000/api/citydata?city=${city}&state=${state}`
  );

  const data = await response.json();
  return data;
}
