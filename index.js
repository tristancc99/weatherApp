let formEl = document.querySelectorAll(".form-group");
let submitEl = document.querySelector("button");
let renderEl = document.querySelector("#view");
let key = "&APPID=b210d6734982108477cab60ce02cd5d2";
let url = "api.openweathermap.org";
let cardParse = new DOMParser().parseFromString(
  `<div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
  <div class="card-header"></div>
  <div class="card-body">
    <p class="card-text"></p>
  </div>
</div>`,
  "text/html"
);
let jumboParse = new DOMParser().parseFromString(
  `<div id="current" class="jumbotron jumbotron-fluid animated fadeInDown delay-1.5s">
<div class="container">
  <h2 class="display-4"></h2>
</div>
</div>`,
  "text/html"
);

let cardTemplate = cardParse.body.children[0];
let jumboTemplate = jumboParse.body.children[0];

function animateCSS(element, animationName, callback) {
  const node = document.querySelector(element);
  node.classList.add("animated", animationName);

  function handleAnimationEnd() {
    node.classList.remove("animated", animationName);
    node.removeEventListener("animationend", handleAnimationEnd);

    if (typeof callback === "function") callback();
  }

  node.addEventListener("animationend", handleAnimationEnd);
}

function getInput(event) {
  if (formEl[0].children[1].children[0].children[0].children[0].checked) {
    let inputName = formEl[0].children[1].children[1].value;
    nameFetch(inputName);
  } else if (
    formEl[1].children[1].children[0].children[0].children[0].checked
  ) {
    let inputZip = formEl[1].children[1].children[1].value;
    zipFetch(inputZip);
  } else if (
    formEl[2].children[1].children[0].children[0].children[0].checked
  ) {
    let inputCoords = formEl[2].children[1].children[1].value;
    let coordinates = inputCoords.split(" ");
    coordFetch(coordinates);
  }
}

submitEl.addEventListener("click", getInput);

async function nameFetch(name) {
  let forecastFetch = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=${name},us&mode=json${key}`
  );
  let dailyFetch = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${name},us&mode=json${key}`
  );
  let forecastData = await forecastFetch.json();
  let dailyData = await dailyFetch.json();
  console.log(forecastData);
  console.log(dailyData);
  pageRender(dailyData, forecastData);
}

async function zipFetch(zip) {
  let forecastFetch = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?zip=${zip},us&mode=json${key}`
  );
  let dailyFetch = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&mode=json${key}`
  );
  let forecastData = await forecastFetch.json();
  let dailyData = await dailyFetch.json();
  console.log(forecastData);
  console.log(dailyData);
  pageRender(dailyData, forecastData);
}

async function coordFetch(coords) {
  let forecastFetch = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&mode=json${key}`
  );
  let dailyFetch = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${coords[0]}&lon=${coords[1]}&mode=json${key}`
  );
  let forecastData = await forecastFetch.json();
  let dailyData = await dailyFetch.json();
  console.log(forecastData);
  console.log(dailyData);
  pageRender(dailyData, forecastData);
}

function pageRender(currentData, forecast) {
  animateCSS("#view", "fadeOutUp", function() {
    //Render new jumbotron with current weather data
    renderEl.innerHTML = "";
    renderEl.classList.remove("animated");
    renderEl.classList.remove("fadeOutUp");
    let weatherJumbo = jumboTemplate;
    weatherJumbo.children[0].children[0].innerHTML = `Current Weather in ${currentData.name}`;
    let pTemp = document.createElement("p");
    pTemp.innerHTML = `Current Temperature is : ${Math.floor(
      (9 / 5) * (currentData.main.temp - 273) + 32
    )}F &#127777`;
    weatherJumbo.appendChild(pTemp);
    let pHumid = document.createElement("p");
    pHumid.innerHTML = `Current Humidity is : ${currentData.main.humidity}% 💦`;
    weatherJumbo.appendChild(pHumid);
    let pRainChance = document.createElement("p");
    pRainChance.innerHTML = `Current chance for Rain is : ${currentData["rain"][
      "1h"
    ] * 10}% &#127783`;
    weatherJumbo.appendChild(pRainChance);
    let pWind = document.createElement("p");
    pWind.innerHTML = `Current Wind Speed is : ${currentData["wind"]["speed"]}mph &#127787`;
    weatherJumbo.appendChild(pWind);
    renderEl.append(weatherJumbo);
    //Render cards with forecast
    forecast.list.forEach(function(currForecast) {
      let newCard = cardTemplate;
      let cardHeader = document.createElement("div");
      cardHeader.setAttribute("class", "card-header");
      cardHeader.innerHTML = currForecast.dt_txt;
      newCard.children[0].append(cardHeader);
      renderEl.appendChild(newCard);
    });
  });
}
