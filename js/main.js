const baseSelect = document.querySelector("#base");
const symbolSelect = document.querySelector("#symbol");
const display = document.querySelector(".display-block");

function start() {
  fetch(`https://api.ratesapi.io/api/latest​`)
    .then((res) => res.json())
    .then((data) => {
      baseSelect.append(new Option("EUR", "EUR"));
      symbolSelect.append(new Option("All", ""));
      for (let currency in data.rates) {
        baseSelect.append(new Option(currency, currency));
        symbolSelect.append(new Option(currency, currency));
      }
    });
}

function getCurrency() {
  fetch(
    `https://api.ratesapi.io/api/latest​?base=${baseSelect.value}&symbols=GBP${symbolSelect.value}`
  )
    .then((res) => res.json())
    .then((data) => {
      while (display.lastChild) {
        display.lastChild.remove();
      }
      for (let currency in data.rates) {
        let lineDiv = document.createElement("div");
        lineDiv.classList.add("line-block");
        let currSpan = document.createElement("span");
        currSpan.innerHTML = currency;
        let spotSpan = document.createElement("span");
        spotSpan.innerHTML = data.rates[currency].toFixed(3);
        lineDiv.append(currSpan, spotSpan);
        display.append(lineDiv);
      }
    });
}
