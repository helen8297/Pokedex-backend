const {
  query
} = require("/Users/helenscott/School-of-Code/Projects/W3D5-Pokedex/pokedex-helen8297/back-end/db/index.js");
const fs = require("fs"); //so we can read the pokedex file
const { promisify } = require("util"); //so we can use promisify
const path = require("path"); //requiring core module path to sort our our path issues

const readFile = promisify(fs.readFile); //so we can use async await. Buy why?

async function uploadPoke() {
  try {
    const data = await readFile(
      path.join(
        "/Users/helenscott/School-of-Code/Projects/W3D5-Pokedex/pokedex-helen8297/back-end/pokedex.json"
      )
    );
    const pokemon = JSON.parse(data);

    for (let i = 0; i < pokemon.length; i++) {
      const {
        pkdx_id,
        name,
        description,
        img_url,
        types,
        evolutions
      } = pokemon[i];

      const res = await query(
        `
        INSERT INTO pokemon (
            pkdx_id,
            name,
            description,
            img_url,
            types,
            evolutions
            )
            VALUES ($1, $2, $3, $4, $5, $6)`,
        [pkdx_id, name, description, img_url, types, evolutions]
      );
      console.log(name); //lets us know whats going on.
    }
  } catch (err) {
    console.log(err);
  }
}
//In the thing above, the brown is the TEXT and blue is PARAMS
//See query in index.js to make sense of it.
//We're relating $1, S2 with the pokemon columsn.
uploadPoke();
