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
import SearchBar from "./SearchBar";

export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    //const state = useSelector((state) => state)
    const [order, setOrder] = useState("");
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
        dispatch(orderByName());
    }, [dispatch]);

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
    function handleOrderByName(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    }

    if (!allPokemons.length) {
        return (
            <Loading />
        )
    } else {

        return (
            <div className='home'>
                <div className='titulo'>
                    <h1>Choose your  Pokemon!</h1>
                </div>
                <div className='barra'>
                    <SearchBar />
                    <div>
                        <select onChange={(e) => handleFilterCreated(e)}>

                            <option value='All'>Todos</option>
                            <option value='Created'>Created</option>
                            <option value='Source'>Database</option>

                        </select>
                    </div>
                    <div>

                        <select onChange={(e) => handleFilterByType(e)}>
                            <option value=''>Search by type</option>
                            {allType.map((c) => {
                                return (
                                    <option value={c.name}>{c.name}</option>)
                            })
                            }

                        </select>

                        <select onChange={(e) => handleOrderByName(e)}>
                            <option value='Order by Name'>Order by name</option>
                            <option value='Asc'> A - Z</option>
                            <option value='Desc'>Z - A</option>
                            <option value='Atc+'>Attack +</option>
                            <option value='Atc-'>Attack -</option>

                        </select>
                    </div>
                    <button onClick={e => { handleClick(e) }}>
                        Reload all Pokemon
                    </button>

                    <div className='center' color='white'>
                        <Link to='/pokemon'>
                            <button>Create a new pokemon</button>
                        </Link>
                    </div>
                </div>
                <div className='center'>
                    <Pagination
                        pokemonPerPage={pokemonPerPage}
                        allPokemons={allPokemons.length}
                        pagination={pagination}
                    />
                </div>
                <div>
                    <div className='main'>
                        {
                            currentPokemon?.map((c) => {
                                return (
                                    <React.Fragment>

                                        <div>
                                            <div  >
                                                <Link className='tit' to={'/pokemons/' + c.id}>
                                                    <div  >
                                                        <Card class="pokemon" name={c.name} image={c.image}
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

            </div>
        )
    }
}
