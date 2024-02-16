const cityInput = document.querySelector(".inputText");
const btn = document.querySelector(".btn");
const weatherResults = document.querySelector(".data-container");
const APIkey = "d66fb84981ce37911b8290b5fb28a8e9";

// console.log(cityInput,btn)

btn.addEventListener("click", () => {
  //   return cityInput.value;
  const cityName = cityInput.value;

  getData(cityName);
});

const getData = (name) => {
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${APIkey}&units=metric&lang=tr`;
  //   console.log(baseUrl);

  fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => {
      const {
        name,
        sys: { country },
        main: { temp, feels_like, humidity },
        wind: { speed },
        weather: [{ description }],
      } = data;
      //   console.log(humidity, speed);

      weatherResults.innerHTML = `
        <div class="info">
                <i class="fa-solid fa-location-dot"></i>
                <p id="sehir">${name}, ${country}</p>
            <div class="deger">
                <p id="sicaklik">Sıcaklık <span>${Math.ceil(temp)} °</span></p>
            </div>
            <div class="weather-info">
                <p id="humidity">Nem <span>%${humidity}</span></p>
                <p id="wind">Rüzgar <span>${speed}km/s</span></p>
            </div>

            <p id="havaDurumu">Hava Durumu <span>${description.toUpperCase()}</span></p>
            <div class="his">
                <p id="hissedilen">Hissedilen Sıcaklık <span>${Math.ceil(
                  feels_like
                )} °</span></p>
            </div>
        </div>
    `;
    })
    .catch((err) => console.log(err));
};
