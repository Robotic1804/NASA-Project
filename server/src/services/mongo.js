

const mongoose = require('mongoose');

require("dotenv").config();
// update below to match your own MongoDB connection string
const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connectivity is ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
   await mongoose.connect(MONGO_URL, {
     //useNewUrlParser: true,
     //useUnifiedTopology: true,
   });
}

async function mongoDisconnect() {

    await mongoose.disconnect();
}
    
    
module.exports = {
  mongoConnect,
  mongoDisconnect,
};