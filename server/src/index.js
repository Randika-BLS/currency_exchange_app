const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle users
app.use(express.json());
app.use(cors());

//all currencies
app.get("/getAllCurrencies", async (req, res) => {
  const nameURL = `https://openexchangerates.org/api/currencies.json?app_id=cf7ca533de11494698808347913ba845`;

  try {
    const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;

    return res.json(nameData);
  } catch (err) {
    console.error(err);
  }
});

//get the target amount
app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, AmountInSourceCurrency } =
    req.query;

  try {
    const dataUrl = `
https://openexchangerates.org/api/historical/${date}.json?app_id=cf7ca533de11494698808347913ba845`;

    const dataResponse = await axios.get(dataUrl);
    const rates = dataResponse.data.rates;

    //rates
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    //final target val
    const targetAmount = (targetRate / sourceRate) * AmountInSourceCurrency;

    return res.json(targetAmount.toFixed(2));
  } catch (err) {
    console.error(err);
  }
});
//listen to a port
app.listen(5000, () => {
  console.log("SERVER STARTED");
});
