import React from "react";


const Pagination = ({pokemonPerPage, allPokemon, pagination}) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPokemon/pokemonPerPage); i++) {
        pageNumbers.push(i);        
    }

    return ( 
        <nav>
            <ul>
                {
                    pageNumbers?.map(number => (
                        <li key={number}>
                            <a href="/#" onClick={() => pagination(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
     );
}
 
export default Pagination;