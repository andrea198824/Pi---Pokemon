import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getPokemon,
    getTypes,
    getDetail,
    getDetailByName,
    postPokemon,
    filterPokemonCreated,
    filterPokemonType,
    orderByName
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card"


//import SearchBar from "./SearchBar";

export default function Home(){
    const dispatch = useDispatch()
    const allPokemon = useSelector((state) => state.pokemon)
    const [order, setOrder] = useState('')
    const [orderr, setOrderr] = useState("");//cambiar nombres
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonPerPage, setDogsPerPage] = useState(12)
    const indexOfLastPokemon = currentPage * pokemonPerPage
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage
    const currentPokemon = allPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon)

        //usestate= añadiendo estado a nuestro componenete funcional
    //Ejecutar el método useState con el valor inicial de nuestro estado nos devuelve un array que tendrá el valor del estado y un método para actualizar el estado.


    const paginado = ((pageNumber) => {
        setCurrentPage(pageNumber)
    })

    const allTemp = useSelector((state) => state.type);

    // un hook que recibe como parámetro una función que se ejecutará cada vez que nuestro componente se renderice, ya sea por un cambio de estado, 
        //por recibir props nuevas o, y esto es importante, porque es la primera vez que se monta.
        useEffect(() => { 
        dispatch(getPokemon());
    }, [dispatch])

    useEffect(() => { // hooks-acepta una función como argumento
        dispatch(getTypes());
    }, [dispatch])


    function handleClick(e) {
        e.preventDefault(); //preventDefault se lo paso para que no se rompa 
        dispatch(getPokemon()) // esto me lo resetea por si se bugea, y me trae todo denuevo
    }
    return (
        <div>
                            <div>
                    {
                        currentPokemon.map((c) => {
                            return (
                                <React.Fragment>

                                    <div>
                                        <div >
                                            <Link  to={'/home/' + c.id}>
                                                <div  >
                                                    <Card name={c.name} image={c.image}
                                                        temperament={
                                                            c.type.map((temp) => temp.name)} key={c.id} />
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