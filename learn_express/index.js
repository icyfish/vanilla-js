const express = require("express");
const morgan = require("morgan");
const mysql = require("mysql");
const app = express();
const path = require("path");

app.use(morgan("combined")); // log the info

app.use(express.static(path.resolve(__dirname, "static")));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("app is listening on port " + port);
});
