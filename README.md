# WeatherApp

This WeatherApp is a Node.js app that has two parts:
1) app.js - shows current weather (temperature, humidity and pressure) data taken from [danepubliczne.imgw.pl](https://danepubliczne.imgw.pl/api/data/synop) in JSON format. After choosing the city (or synoptic station) data will be saved into a .txt file.
2) sortedWeather.js - shows the warmest and coldest synoptic station at the moment as well as a list of all available synoptic stations sorted in descending order starting with the highest temp.



## Run - app.js
CTRL+F to check if your city is on list of 62 available stations to check weather:

Białystok,
Bielsko Biała,
Chojnice,
Częstochowa,
Elbląg,
Gdańsk,
Gorzów,
Hel,
Jelenia Góra,
Kalisz,
Kasprowy Wierch,
Katowice,
Kętrzyn,
Kielce,
Kłodzko,
Koło,
Kołobrzeg,
Koszalin,
Kozienice,
Kraków,
Krosno,
Legnica,
Lesko,
Leszno,
Lębork,
Lublin,
Łeba,
Łódź,
Mikołajki,
Mława,
Nowy Sącz,
Olsztyn,
Opole,
Ostrołęka,
Piła,
Platforma,
Płock,
Poznań,
Przemyśl,
Racibórz,
Resko,
Rzeszów,
Sandomierz,
Siedlce,
Słubice,
Sulejów,
Suwałki,
Szczecin,
Szczecinek,
Śnieżka,
Świnoujście,
Tarnów,
Terespol,
Toruń,
Ustka,
Warszawa,
Wieluń,
Włodawa,
Wrocław,
Zakopane,
Zamość,
Zielona Góra,


You can also run one of the commands below to see same list in your console
```bash
node app.js list
```
or
```bash
node app.js List
```

Run node app.js with the city name (synoptic station) that you want to check weather of. Eg. :
```bash
node app.js Kłodzko
```

![output](https://i.ibb.co/KGLXq6B/Screenshot-2022-10-06-210300.png)

For multiple word cities (eg. Zielona Góra) use
```bash
node app.js "Zielona Góra"
```


## Run - sortedWeather.js

```bash
node sortedWeather.js
```

to see currently warmest and coldest stations, and rest of the stations sorted from highest temp.

![output](https://i.ibb.co/8rMVh0g/Screenshot-2022-10-06-203320.png)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
