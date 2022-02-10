import '../css/Home.css';
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getPokemon,
    getTypes,
    filterPokemonCreated,
    filterPokemonType,
    orderByName
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination"
import Loading from './Loading';

export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    //const state = useSelector((state) => state)
    const [currentPage, setCurrentPage] = useState(1);
    const pokemonPerPage = 12;
    const lastPokemon = currentPage * pokemonPerPage;
    const firstPokemon = lastPokemon - pokemonPerPage;
    const currentPokemon = allPokemons.slice(firstPokemon, lastPokemon);

    //usestate= añadiendo estado a nuestro componenete funcional
    //Ejecutar el método useState con el valor inicial de nuestro estado nos devuelve un array que tendrá el valor del estado y un método para actualizar el estado.


    const pagination = ((pageNumber) => {
        setCurrentPage(pageNumber)
    })

    const allType = useSelector((state) => state.types);

    // un hook que recibe como parámetro una función que se ejecutará cada vez que nuestro componente se renderice, ya sea por un cambio de estado, 
    //por recibir props nuevas o, y esto es importante, porque es la primera vez que se monta.
    useEffect(() => {
        dispatch(getPokemon());
        dispatch(getTypes());
    },[dispatch]);

    function handleClick(e) {
        e.preventDefault(); //preventDefault se lo paso para que no se rompa 
        dispatch(getPokemon()) // esto me lo resetea por si se bugea, y me trae todo denuevo
    }
    function handleFilterCreated(e) {
        e.preventDefault(); 
        dispatch(filterPokemonCreated(e.target.value));
        setCurrentPage(1); 
    } 
    function handleFilterByType(e) {
        e.preventDefault();
        dispatch(filterPokemonType((e.target.value)));
        setCurrentPage(1);
    }
    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
    }

    if(!allPokemons.length){
        return(
            <Loading/>
        )
    }else{

    return (
        <div className='home'>
            <div className='center'>
                <h1>Elige a tus Pokemon!</h1>
            </div>
            <div  className='center'>
            <select onChange={(e) => handleFilterCreated(e)}>
                        <option value='All'>Todos</option>
                        <option value='Created'>Creado por ti!</option>
                        <option value='Source'>Base de datos</option>

                    </select>
                    </div>
                    <div className='center'>
                    <button onChange={e => { handleClick(e) }}>
                        Volver a cargar todos los Pokemon
                    </button>
                    <select onChange={(e) => handleFilterByType(e)}>
                        <option value=''>Filtrar por tipo</option>
                        {allType.map((c) => {
                            return(
                            <option  value={c.name}>{c.name}</option>)})
                            }
                        
                    </select>
                    <select
                        onChange={(e) => handleOrderByName(e)}
                    >
                        <option value='Order by Name'>Orden by name</option>
                        <option value='Asc'> A - Z</option>
                        <option value='Desc'>Z - A</option>
                        
                    </select>
                </div>
                <div className='center' color='white'>
                    <Link to='/pokemon'>Crear Pokemon</Link>
                </div>
            <div className='center'>
            <Pagination
                pokemonPerPage={pokemonPerPage}
                allPokemons={allPokemons.length}
                pagination={pagination}
            />
            </div>
            <div className='main'>
                {
                    currentPokemon?.map((c) => {
                        return (
                            <React.Fragment>

                                <div>
                                    <div >
                                        <Link className='tit' to={'/pokemons/' + c.id}>
                                            <div  >
                                                <Card name={c.name} image={c.image}
                                                    types={
                                                        c.types.map((c) => c.name)} key={c.id} />
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                            </React.Fragment>
                        )
                    })
                }
            </div>

        </div>
    )
            }}
