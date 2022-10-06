import fetch from 'node-fetch';
import { appendFile } from 'fs/promises';
import { normalize, resolve } from 'path';
import colors from 'colors';

function safeJoin(base, target) {
  const targetPath = `.${normalize(`/${target}`)}`;
  return resolve(base, targetPath);
}

const getDataFileName = city => safeJoin('./data/', `${city}.txt`);
const userInput = process.argv[2];

const processWeatherData = async (data, cityName) => {

  const userCity = data.find(stationData => stationData.stacja === cityName);
  if (!userCity) {
    if ( userInput === 'List' || userInput === 'list') {
      // 'stacja' is taken from api - must be same name which was used in api to use it
      for(const city of data){
        console.log(city.stacja);
      }
      return;
    }
    throw new Error('No such city in our API. If you want to see available cities, use "List" or "list" as city name.');
  }

  // Destructuring and changing names to english
  const {
    cisnienie: pressure,
    wilgotnosc_wzgledna: humidity,
    temperatura: temp,
  } = userCity;

  // showing weather info from chosen city
  const weatherInfo = `In ${cityName.bold.bgGreen} is ${temp.bold}°C, ${humidity.bold}% of humidity and pressure of ${pressure.bold} hPa`;
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
