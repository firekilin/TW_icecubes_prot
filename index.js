const express = require ("express");
const app = express ();
const main = require ("./linebot");
require('dotenv').config();
  
app.listen (process.env.port, () => {
  console.log ("listen on port:" + process.env.port);
});

app.use ("/", main); 

