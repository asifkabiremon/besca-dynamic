const express = require("express");
// const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");


const router = express.Router();

// This is the route for getting data
router.post("/", async (req, res) => {
  const target = req.body.target;
  const action = req.body.action;
  console.log(req.body);
  console.log(req.body.searchWay.fields);
  try {
    if (action === "search") {
      const parameters = req.body.parameters;
      const searchWay = req.body.searchWay;
      const fields = searchWay.fields;
      const display = req.body.display;
      const maxRow = req.body.maxRow;
      const page = req.body.page;
      const tableCol = fields.map((field) => field.key);
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

      // console.log(tableCol);
      // get the data for the filtered columns
      const filteredDataDisplay = filteredData.map((user) => {
        const filteredUser = {};
        tableCol.forEach((column) => {
          filteredUser[column] = user[column];
        });
        return filteredUser;
      });
      // console.log([...filteredDataDisplay].slice(page * maxRow, (page + 1) * maxRow).length);

      res.send({
        target: target,
        action: action,
        tableCol: tableCol,
        tableRow: [...filteredDataDisplay].slice(page * maxRow, (page + 1) * maxRow),
        display: display,
        totalPage: Math.ceil(filteredDataDisplay.length / maxRow),
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});