const express = require("express");
const pokemonRouter = require("./routes/pokemon.js");
const cors = require("cors");

const app = express();
const PORT = 5000;

//app.use will happen for ANY type of request that we get
//this is a piece of middleware google express middlware

app.use((req, res, next) => {
  console.log(`${req.method} request received to ${req.url}"`);
  next();
});
app.use(cors()); //this will run a function on each request so they work.

//middleware to parse our post requests
app.use(express.json());

app.use(pokemonRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
