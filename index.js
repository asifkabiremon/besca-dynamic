const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const templateRoute = require('./src/routes/template.route.jsx');
const getDataRoute = require('./src/routes/getData.route.jsx');



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
