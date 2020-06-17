"use strict";

const fs = require("fs");
const adjustments = require("./sources/adjustments");

const DATA_OUTPUT_FILE = "./data.json";

// Add any territories to remove from the output here
const FILTERED_TERRITORIES = [];

// Read raw data and initialize lookup objects
let rawCountries = JSON.parse(
  fs.readFileSync(__dirname + "/sources/country-codes_json.json"),
);
let rawEmojis = JSON.parse(
  fs.readFileSync(__dirname + "/sources/emojis_json.json"),
);
let newCountryData = {};
let flagMap = {};

// Filter giant emoji list for flags and make a lookup
rawEmojis
  .filter((e) => e.Subgroup === "country-flag")
  .map((e) => {
    flagMap[e.Name] = e.Representation;
  });

// Build the list of countries
const adjustmentKeys = Object.keys(adjustments);

rawCountries
  .filter((country) => country["UNTERM English Short"] !== null)
  .filter(
    (country) =>
      FILTERED_TERRITORIES.indexOf(country["ISO3166-1-Alpha-2"]) === -1,
  )
  .map((country) => {
    const territory = country["ISO3166-1-Alpha-2"];
    const name = country["UNTERM English Short"];

    let _name = name;
    let _flagKey = name;

    if (adjustmentKeys.indexOf(name) !== -1) {
      _name = adjustments[name].displayName;
      _flagKey = adjustments[name].keyInFlagMap;
    }

    const flag = flagMap[`flag ${_flagKey}`] || null;

    console.log(`Making ${flag}  - ${_name}`);
    newCountryData[territory] = {
      name: _name,
      currencyCode: country["ISO4217-currency_alphabetic_code"] || null,
      flag,
      phoneCode: country["Dial"] || null,
      capital: country["Capital"] || null,
    };
  });

// Write data
fs.writeFile(
  DATA_OUTPUT_FILE,
  JSON.stringify(newCountryData, null, 2),
  (error) => {
    if (error) throw error;
    console.log(
      `Wrote ${
        Object.keys(newCountryData).length
      } countries to ${DATA_OUTPUT_FILE} 🚀`,
    );
  },
);
