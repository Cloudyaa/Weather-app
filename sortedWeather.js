import fetch from 'node-fetch';
import colors from 'colors';

const processWeatherData = async data => {
  // [...data] makes copy of original array so only copy will be sorted
  const sortedByTemp = [...data].sort((a, b) => Number(b.temperatura) - Number(a.temperatura));

  const reversed = [...sortedByTemp].reverse();

  // showing only first city as it's the warmest
  const {
    stacja: warmestCity,
    temperatura: highestTemp,
  } = sortedByTemp[0];

  const {
    stacja: coldestCity,
    temperatura: lowestTemp,
  } = reversed[0];

  console.log(
    `The warmest station right now is: ${warmestCity.bold.red} with ${highestTemp.red}°C`,
    `\nThe coldest station right now is: ${coldestCity.bold.cyan} with ${lowestTemp.cyan}°C`,
    '\n----------------------------------------------------------',
  );

  for (const { stacja: city, temperatura: temp } of sortedByTemp) {
    console.log(`In ${city.bold} is now ${temp.bold.yellow}°C`);
  }
};

const findWarmestCity = async () => {
  try {
    const result = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
    const data = await result.json();
    await processWeatherData(data);
  } catch (err) {
    console.log('Error has been occurred.', err);
  }
};

await findWarmestCity();
