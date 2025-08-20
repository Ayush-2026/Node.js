const express = require("express");
const app = express();
const db2 = require("./db2");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000; // if no port given in env file, it will use 3000

const personRoutes2 = require("./routes/personRoutes2.js");
app.use("/person", personRoutes2);

const menuItemRoutes2 = require("./routes/menuItemRoutes2.js");
app.use("/menuItems", menuItemRoutes2);

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
