const express = require("express");
// const mongoose = require("mongoose");
const fs = require("fs").promises;
const path = require("path");


const router = express.Router();

// This is the route for getting the data
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
        user.id && (filteredUser._id = user._id);
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

// This is the route for getting the data from the database
// router.post("/db", async (req, res) => {
//   const target = req.body.target;
//   const action = req.body.action;
//   // console.log(req.body);
//   try {
//     if (action === "search") {
//       const parameters = req.body.parameters;
//       const display = req.body.display;
//       const maxRow = req.body.maxRow;
//       const page = req.body.page;

//       const tableCol = Object.keys(display);

//       const selectedField = {"_id": 0};
//       tableCol.map((column) => selectedField[column] = 1);
//       console.log(selectedField);

//       // await client.connect();
//       // // Access the MongoDB database
//       // const database = client.db('BES3D'); 

//       const TargetModel = mongoose.model(target, mongoose.Schema({}), target);
//       const result = await TargetModel.aggregate([
//         // Filter the documents
//         { $match: parameters },
//         // Select the fields to return
//         { $project: selectedField },
//         // Skip the first 20 documents
//         { $skip: 0 },
//         // Limit the result eg 20 documents (from 21 to 40)
//         { $limit: maxRow }
//       ]);

//       const totalRecord = await TargetModel.countDocuments();

//       // console.log(totalRecord);

//       const responseData = result.map((document) => {
//         const documentData = {};
//         tableCol.forEach((field) => {
//           documentData[field] = document[field];
//         });
//         return documentData;
//       });
//       // console.log(responseData);

//       res.send({
//         target: target,
//         action: action,
//         tableCol: tableCol,
//         tableRow: responseData,
//         display: display,
//         totalPage: Math.ceil(totalRecord / maxRow),
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error);
//   }
// });

module.exports = router;
