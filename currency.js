// ==============================
// STAGE 1: CONNECT TO HTML
// ==============================

const inputamount = document.getElementById("amount");
const fromcurrency = document.getElementById("fromCurrency");
const tocurrency = document.getElementById("toCurrency");
const resultbox = document.getElementById("resultBox");
// ==============================
// STAGE 2: CURRENCY DATA
// ========================
// 
let rates={}; 

async function fetchRates() {
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/USD"
  );

  const data = await response.json();
  rates = data.rates;

  populateDropdowns();
}


// ==============================
// STAGE 3: ADD OPTIONS TO SELECT
// ==============================
function populateDropdowns() {
  fromcurrency.innerHTML = `<option value="">Select currency</option>`;
  tocurrency.innerHTML = `<option value="">Select currency</option>`;

  for (let currency in rates) {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromcurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    tocurrency.appendChild(option2);
  }
}

// ==============================
// STAGE 4: CONVERT FUNCTION
// ==============================

function convertCurrency() {
  const amount = inputamount.value;
  const from = fromcurrency.value;
  const to = tocurrency.value;
  
  if (!amount || !from || !to) {
    resultbox.textContent = "Please enter all values";
    return;
  }

  if (!rates[from] || !rates[to]) {
    resultbox.textContent = "Rates not loaded yet";
    return;
  }

  const converted = (amount / rates[from]) * rates[to];
  resultbox.textContent =
    `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
}

// ==============================
// STAGE 5: EVENT LISTENERS
// ==============================

inputamount.addEventListener("input", convertCurrency);
fromcurrency.addEventListener("change", convertCurrency);
tocurrency.addEventListener("change", convertCurrency);
fetchRates();

const currencyToCountry = {
  USD: "us",
  INR: "in",
  EUR: "eu",
  GBP: "gb",
  HKD: "hk",
  JPY: "jp",
  BAM: "ba"
};
const fromFlag = document.getElementById("fromFlag");
const toFlag = document.getElementById("toFlag");

function updateFlag(selectElement, flagElement) {
  const currency = selectElement.value;
  const countryCode = currencyToCountry[currency];

  if (countryCode) {
    flagElement.src = `https://flagcdn.com/w40/${countryCode}.png`;
  }
}

fromcurrency.addEventListener("change", () => {
  updateFlag(fromcurrency, fromFlag);
});

tocurrency.addEventListener("change", () => {
  updateFlag(tocurrency, toFlag);
});