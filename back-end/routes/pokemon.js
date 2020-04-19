const express = require("express");
const {
  getPokemon,
  getPokemonById,
  getPokemonByNameSearch,
  getPokemonByName,
  savePokemon,
  deletePokemonByID,
  replacePokemon,
  patchPokemon
} = require("../models/pokemon.js");
const router = express.Router();

router.get("/pokemon", async (req, res) => {
  const { name, search } = req.query;
  if (name) {
    const searchResult = await getPokemonByName(name);
    res.json(searchResult);
    return;
  }
  if (search) {
    const searchResult = await getPokemonByNameSearch(search);
    res.json(searchResult);
    return;
  }
  const pokemon = await getPokemon();
  res.json(pokemon);
});

router.get("/pokemon/:pokemonId", async (req, res) => {
  const { pokemonId } = req.params;
  const pokemon = await getPokemonById(pokemonId);
  res.json(pokemon);
});

router.post("/pokemon", async (req, res) => {
  //saving the body from the request in a body const
  const { body } = req;
  await savePokemon(body);
  res.send(`you have saved ${body.name} as a pokemon`);
});

router.delete("/pokemon/:pokemonId", async (req, res) => {
  const { pokemonId } = req.params;
  const name = await deletePokemonByID(pokemonId);
  //name if else for if its empty
  if (name) {
    res.status(200).send(`You have deleted a Pokemon ${name}.`);
  } else res.status(406).send(`There is no Pokemon to delete :-(`);
});

router.post("/pokemon", async (req, res) => {
  //saving the body from the request in a body const
  const { body } = req;
  await savePokemon(body);
  res.send(`you have saved ${body.name} as a pokemon`);
});

router.put("/pokemon/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const result = await replacePokemon(body, id);
  res.send(
    `You have updated Pokemon with the id of ${id}, it is now called ${result.name}!`
  );
});

router.patch("/pokemon/:id", async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const result = await patchPokemon(body, id);
  res.send({
    success: true,
    message: `Pokemon with id ${id} has been patched.`
  });
});

module.exports = router;
