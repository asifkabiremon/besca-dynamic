const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();

// This is the route for getting the data
router.post("/", async (req, res) => {
  const target = req.body.target;
  const action = req.body.action;
  console.log(req.body);
  try {
    if (action === "search") {
      const parameters = req.body.parameters;
      const display = req.body.display;
      const filteredColumns = Object.keys(display);
      // console.log(parameters);

      const filePath = await path.join(
        __dirname,
        `../../public/${target}.json`
      );
      // console.log(filePath);
      const file = await fs.readFile(filePath, "utf8");
      const data = JSON.parse(file);
      // console.log(data);

      // filter the data based on the parameters
      const filteredData = data.filter((user) => {
        return Object.keys(parameters).every((key) => {
          try {
            return user[key]
              .toLowerCase()
              .includes(parameters[key].toLowerCase());
          } catch (error) {
            return parameters[key] === user[key];
          }
        });
      });
      // console.log(filteredData);

      // filter the columns based on the parameters

      // console.log(filteredColumns);
      // get the data for the filtered columns
      const filteredDataDisplay = filteredData.map((user) => {
        const filteredUser = {};
        filteredColumns.forEach((column) => {
          filteredUser[column] = user[column];
        });
        return filteredUser;
      });
      // console.log(filteredDataDisplay);

      res.send({
        target: target,
        action: action,
        tableCol: filteredColumns,
        tableRow: [...filteredDataDisplay],
        display: display,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;
