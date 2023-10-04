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

module.exports = router;
