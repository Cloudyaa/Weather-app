const fetch = require('node-fetch');

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
    `The warmest city right now is: ${warmestCity} with ${highestTemp}°C`,
    `\nThe coldest city right now is: ${coldestCity} with ${lowestTemp}°C`,
    '\n----------------------------------------------------------',
  );

  // eslint-disable-next-line no-restricted-syntax
  for (const { stacja: city, temperatura: temp } of sortedByTemp) {
    console.log(`In ${city} is now ${temp}°C`);
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

findWarmestCity();
