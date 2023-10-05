const express = require("express");
const fs = require("fs").promises;
const path = require("path");


const router = express.Router();

// This is the route for getting all the countries
router.get("/country", async (req, res) => {
  try {
    const filePath = await path.join(
    __dirname,
    `../../public/country.json`
    );
    // console.log(filePath);
    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);
    // console.log(data);
    
    const countries = Object.keys(data);

    res.send(countries);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// This is the route for getting all the cities of a country
router.get("/city/:country", async (req, res) => {
  try {
    const country = req.params.country;
    const filePath = await path.join(
      __dirname,
      `../../public/country.json`
    );
    // console.log(filePath);
    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);
    // console.log(data);
    if (!data[country]) {
      res.status(404).send("");
      return;
    }
    const cities = data[country];

    res.send(cities);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// This is the route for getting a country with partial name
router.get("/country/:country", async (req, res) => {
  try {
    const country = req.params.country;
    console.log(country);
    const filePath = await path.join(
      __dirname,
      `../../public/country.json`
    );
    // console.log(filePath);
    const file = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(file);
    // console.log(data);
    
    
    // search country with partial name
    const countries = Object.keys(data);
    const result = countries.filter((c) => c.startsWith(country));
    res.send(result);

  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
