const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const axios = require('axios');
require("dotenv").config();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=40`);
    const apiData = apiUrl.data.results.map(c => {
        return {
            name: c.name,
            url: c.url,
        };
    })

    var allPokemon = [];

    for (pokemon of apiData) {
        var apiInfo = await axios.get(`${pokemon.url}`);
        allPokemon.push({
            id: apiInfo.data.id,
            name: apiInfo.data.name,
            image: apiInfo.data.sprites.front_default,
            imageDetail: apiInfo.data.sprites.other.dream_world.front_default,
            hp: apiInfo.data.stats[0].base_stat,
            attack: apiInfo.data.stats[1].base_stat,
            defense: apiInfo.data.stats[2].base_stat,
            speed: apiInfo.data.stats[5].base_stat,
            height: apiInfo.data.height,
            weight: apiInfo.data.weight,
            types: apiInfo.data.types.map(types => ({
                name: types.type.name,
                id: types.slot
            })),

        })
    }
    return allPokemon;
}

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
}
const getAllPokemon = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal;
}

router.get("/pokemons", async (req, res, next) => {
    try {
        const name = req.query.name;
        let pokeTotal = await getAllPokemon(); //me traigo todos, Db y api
        if (name) {
            // si hay un nombre por query
            let pokName = await pokeTotal.filter((pokemon) =>
                pokemon.name.toLowerCase().includes(name.toLowerCase())
            );
            pokName.length //si hay algún nombre
                ? res.status(200).send(pokName)
                : res
                    .status(404)
                    .send({ info: "Sorry, the pokemon you are looking for is not here." });
        } else {
            res.status(200).send(pokeTotal); //el otro caso es que no haya un
            //query y manda un status 200 con todos los dogs
        }
    } catch (error) {
        next(error);
    }
});


router.get('/pokemons/:id', async (req, res) => {
    const { id } = req.params
    const findPokemon = await getAllPokemon()
    if (id) {
        let pokemonId = await findPokemon.filter(x => x.id == id)
        pokemonId.length ?
            res.status(200).send(pokemonId) :
            res.status(404).send('No está el Pokemon');

    }
})

router.get('/type', async (req, res) => {
    const typeApi = await axios.get('https://pokeapi.co/api/v2/type')
    const types = typeApi.data.results.map(c => c.name)
    console.log(types);
    types.forEach(c => {
        Type.findOrCreate({
            where: { name: c }
        })
    });
    const allTypes = await Type.findAll();
    res.send(allTypes);
})

router.post('/pokemon', async (req, res, next) => {
    try {
        const { name, image, attack, defense, speed, height, weight, types, createdInDb } = req.body;

        const newPokemon = await Pokemon.create({
            name,
            image,
            attack,
            defense,
            speed,
            height,
            weight,
            createdInDb
        });
        console.log("777")
        console.log(req.body)
        let typeDb = await Type.findAll({
            where: { name: types },

        });

        await newPokemon.addType(typeDb)
        res.status(201).send({ info: "Pokemon created successfully!" });
    } catch (error) {
        next(error);
    }
})

module.exports = router;
