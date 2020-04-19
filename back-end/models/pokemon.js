//This file gets the raw json pokemon, parses it and sends it on.

const fs = require("fs");
//util is a big object, we're taking promisify for our needs
const { promisify } = require("util");
const { query } = require("../db/index.js");

async function getPokemon() {
  const data = await query(`SELECT * FROM pokemon;`);
  console.log(data);
  return data.rows; //put .rows on so we dont get other bumf.
}

async function getPokemonById(id) {
  const data = await query(`SELECT * FROM pokemon WHERE id=$1`, [id]);
  console.log(data);
  return data.rows[0];
}

// async function getPokemonByType(type) {
//   const data = await query(`SELECT * FROM pokemon WHERE types=$1`, [id]);
//   console.log(data);
//   return data.rows[0];
// }

async function getPokemonByName(name) {
  const data = await query(`SELECT * FROM pokemon WHERE name ILIKE $1`, [name]);
  console.log(data);
  return data.rows[0];
}

async function getPokemonByNameSearch(name) {
  const data = await query(
    `SELECT * FROM pokemon WHERE name ILIKE '%' || $1 || '%'`,
    [name]
  );
  console.log(data);
  return data.rows;
}

async function savePokemon({
  pkdx_id,
  name,
  description,
  img_url,
  types,
  evolutions
}) {
  const data = await query(
    `INSERT INTO pokemon ( pkdx_id, name, description, img_url, types, evolutions) VALUES ($1, $2, $3, $4, $5, $6);`,
    [pkdx_id, name, description, img_url, types, evolutions]
  );
  console.log(`You have inserted a new Pokemon called ${data}`);
}

async function deletePokemonByID(id) {
  const res = await query(`DELETE FROM pokemon WHERE id=$1 RETURNING name`, [
    id
  ]);

  if (res.rowCount > 0) {
    const { name } = res.rows[0];
    return name;
  } else return console.log("No Pokemon to delete.");
}

async function replacePokemon(body, id) {
  const { pkdx_id, name, description, img_url, types, evolutions } = body;
  const res = await query(
    `UPDATE pokemon SET pkdx_id =$1, name=$2, description=$3, img_url=$4, 
    types=$5, evolutions=$6 WHERE id = $7 RETURNING name;`,
    [pkdx_id, name, description, img_url, types, evolutions, id]
  );
  console.log(res);
  return res.rows[0]; //this is alllll the data from this pokemon object
}

async function patchPokemon(body, id) {
  const { pkdx_id, name, description, img_url, types, evolutions } = body;
  const res = await query(
    `UPDATE pokemon
  SET 
  pkdx_id = COALESCE($1, pkdx_id),
  name = COALESCE($2, name),
  description = COALESCE($3, description),
  img_url = COALESCE($4, img_url),
  types = COALESCE($5, types),
  evolutions = COALESCE($6, evolutions)
  WHERE id = $7`,
    [pkdx_id, name, description, img_url, types, evolutions, id]
  );
  return res.rows[0];
}

module.exports = {
  getPokemon,
  getPokemonById,
  getPokemonByName,
  getPokemonByNameSearch,
  savePokemon,
  deletePokemonByID,
  replacePokemon,
  patchPokemon
};
