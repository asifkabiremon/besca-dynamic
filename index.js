const express = require('express');
const cors = require("cors");
require("dotenv").config();

const templateRoute = require('./src/routes/template.route.jsx');
const getDataRoute = require('./src/routes/getData.route.jsx');
// const { connectDB } = require('./src/database/Mongo.database.js');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());


// connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!'); 
});


app.use('/api/template', templateRoute);
app.use('/api/getTableData', getDataRoute);


app.use("*", (req, res) => {
  res.send("No route found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
