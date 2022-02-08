import React from "react";
import '../css/Paginado.css';


export default function Pagination ({ pokemonPerPage, allPokemons, pagination }) {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemons / pokemonPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination" >
                {pageNumbers &&
                    pageNumbers.map(number => (
                        <li key={number} >
                            <button onClick={() => pagination(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}