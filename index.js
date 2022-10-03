const fetch = require('node-fetch');
const { appendFile } = require('fs').promises;
const { normalize, resolve } = require('path');

function safeJoin(base, target) {
  const targetPath = `.${normalize(`/${target}`)}`;
  return resolve(base, targetPath);
}

const getDataFileName = city => safeJoin('./data/', `${city}.txt`);

const processWeatherData = async (data, cityName) => {
  // list of all available cities
  if (process.argv[2] === 'List') {
    // eslint-disable-next-line no-restricted-syntax
    for (const city of data) {
      console.log(city.stacja);
    } return;
  }

  // 'stacja' is taken from api - must be same name which was used in api to use it
  // same as  if (stationData.stacja === cityName) return true;
  const userCity = data.find(stationData => stationData.stacja === cityName);
  if (!userCity) {
    throw new Error('No such city in our API. If you want to see available cities, use "List" as city name.');
  }

  // Destructuring and changing names to english
  const {
    cisnienie: pressure,
    wilgotnosc_wzgledna: humidity,
    temperatura: temp,
  } = userCity;

  // showing weather info from chosen city
  const weatherInfo = `In ${cityName} there is ${temp}°C, ${humidity}% of humidity and pressure of ${pressure} hPa`;
  console.log(weatherInfo);

  // taking date and time of weather check
  const dateTimeString = new Date().toLocaleString();

  // saving weather info into the file
  await appendFile(getDataFileName(cityName), `${dateTimeString}\n${weatherInfo}\n`);
};

const checkCityWeather = async cityName => {
  try {
    const result = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
    const data = await result.json();
    await processWeatherData(data, cityName);
  } catch (err) {
    console.log('Error has been occurred.', err);
  }
};

checkCityWeather(process.argv[2]);
