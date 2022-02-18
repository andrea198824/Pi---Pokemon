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
    try{
        let url = `https://pokeapi.co/api/v2/pokemon`;
        let pokemons = [];
        do {
            let info = await axios.get(url);
            let pokemosApi = info.data;
            let pokeInfo = pokemosApi.results.map((e) =>{
                return {
                    name : e.name,
                    url: e.url,
                };
            });
            pokemons.push(...pokeInfo);
            url=pokemosApi.next;
            } while (url !== null && pokemons.length < 40);
            let poksData = Promise.all(
                pokemons.map(async (e) =>{
                    let pokemon = await axios.get(e.url);
                    return {
                        id: pokemon.data.id,
                        name: pokemon.data.name,
                        image: pokemon.data.sprites.other.dream_world.front_default,
                        imageDetail: pokemon.data.sprites.other.home.front_default ,
                        hp: pokemon.data.stats[0].base_stat,
                        attack: pokemon.data.stats[1].base_stat,
                        defense: pokemon.data.stats[2].base_stat,
                        speed: pokemon.data.stats[5].base_stat,
                        height: pokemon.data.height,
                        weight: pokemon.data.weight,
                        types: pokemon.data.types.map(types => ({
                            name: types.type.name,
                        })), 
                    }
                    
                })
            );
            return poksData;
    } catch (e) {
        console.log(e);
    }
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

// const getPokemonDetail = async(e) => {
//     try{
//         const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${e}`);
//         const data = await apiData.data;
//         const pokeData = {
//             id: data.id,
//             name: data.name,
//             image: data.sprites.other.home.front_default,
//             types: data.types.map((e) => {
//                 return{
//                     name: e.type.name,
//                 };
//             }),
//             hp: apiInfo.data.stats[0].base_stat,
//             attack: apiInfo.data.stats[1].base_stat,
//             defense: apiInfo.data.stats[2].base_stat,
//             speed: apiInfo.data.stats[5].base_stat,
//             height: apiInfo.data.height,
//             weight: apiInfo.data.weight
//         };
//         return pokeData;
//     } catch (e){
//         console.log(e)
//     }
// };

const getAllPokemon = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo)
    return infoTotal;
}

router.get("/pokemons", async (req, res, next) => {
    try {
        const {name} = req.query;
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
            res.status(200).send(pokeTotal); 
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
    
        const { name, image, hp, attack, defense, speed, height, weight, types, createdInDb } = req.body;
        try {
            let pokemonExist = await Pokemon.findOne({
                where:{
                    name : name.toLowerCase(),
                }
            });
            
            if(pokemonExist) return res.json({msg: 'Pokemon existente'});
            
        const newPokemon = await Pokemon.create({
            name,
            hp,
            image,
            attack,
            defense,
            speed,
            height,
            weight,
            createdInDb
        });

        let typeDb = await Type.findAll({
            where: { name: types },

        });

        await newPokemon.addType(typeDb)
        res.status(201).send({ info: "Pokemon created successfully!" });
    } catch (error) {
        next(error);
    }
})

router.delete('/pokemons/:id', async(req, res) => {
    try {
        const { id } = req.params;
        await Pokemon.destroy({
            where: {
                id,
            }
        });
        res.status(200).send('Pokemon eliminated');
    } catch(error) {
        console.log(error);
        res.status(400).send('can not find that Pokemon');
    }
})
module.exports = router;
