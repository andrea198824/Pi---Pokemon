import '../css/Home.css';
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getPokemon,
    getTypes,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination"

export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    console.log(allPokemons);
    const state = useSelector((state) => state)
    //const [,setOrder] = useState('');
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

    // un hook que recibe como parámetro una función que se ejecutará cada vez que nuestro componente se renderice, ya sea por un cambio de estado, 
    //por recibir props nuevas o, y esto es importante, porque es la primera vez que se monta.
    useEffect(() => {
        dispatch(getPokemon());
        dispatch(getTypes());
    })

    function handleClick(e) {
        e.preventDefault(); //preventDefault se lo paso para que no se rompa 
        dispatch(getPokemon()) // esto me lo resetea por si se bugea, y me trae todo denuevo
    }
    return (
        <div className='home'>
            <div className='center'>
                <h1>Elige a tu Pokemon!</h1>
            </div>

            <Pagination
                pokemonPerPage={pokemonPerPage}
                state={state.length}
                pagination={pagination}
            />
            <div className='main'>
                {
                    currentPokemon?.map((c) => {
                        return (
                            <React.Fragment>

                                <div>
                                    <div >
                                        <Link className='tit' to={'/home/' + c.id}>
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
}
