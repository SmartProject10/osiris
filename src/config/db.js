
require('dotenv').config();
const uri = process.env.URI;
const mongoose = require("mongoose");


async function run() {
mongoose
  .connect(uri, {
  })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("error connecting to mongodb", err);
  });

}

run().catch(console.dir);





