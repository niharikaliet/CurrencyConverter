const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");
const toggleBtn = document.getElementById("themeToggle");

const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

// Theme toggle
toggleBtn.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
});

// Populate dropdowns
fetch(apiURL)
    .then(res => res.json())
    .then(data => {
        const currencies = Object.keys(data.rates);
        currencies.forEach(currency => {
            let option1 = document.createElement("option");
            option1.value = currency;
            option1.text = currency;
            fromCurrency.appendChild(option1);

            let option2 = document.createElement("option");
            option2.value = currency;
            option2.text = currency;
            toCurrency.appendChild(option2);
        });

        fromCurrency.value = "USD";
        toCurrency.value = "INR";
    });

function convertCurrency() {
    const amount = parseFloat(document.getElementById("amount").value);
    if (isNaN(amount)) {
        result.textContent = "Please enter a valid amount.";
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[to];
            const converted = (amount * rate).toFixed(2);
            result.textContent = `Converted Amount: ${converted} ${to}`;
        });
}
