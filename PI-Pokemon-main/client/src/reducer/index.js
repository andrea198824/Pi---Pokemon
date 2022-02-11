const initialState = {
  pokemons: [],
  allPokemon: [],
  types: [],
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMON":
      return {
        ...state,
        pokemons: action.payload,
        allPokemon: action.payload,
      };
    case "GET_TYPE":
      return {
        ...state,
        types: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "SEARCH_POKEMON":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "POST_POKEMON":
      return {
        ...state,
      };
    case "FILTER_POKEMON_CREATED":
      let pokemonsCreated = state.allPokemon;
      let filterCreated;
      if(action.payload === "Created"){
        filterCreated = pokemonsCreated.filter((e)=> e.createInDb);
        } else if (action.payload === "Source"){
          filterCreated = pokemonsCreated.filter((e)=> !e.createInDb);
        }else {
          filterCreated = pokemonsCreated
        }
      return {
        ...state,
        pokemons: filterCreated,
      };

    case "FILTER_BY_TYPE":
      const allPokemon2 = state.allPokemon;
      let typeFiltered = action.payload === "All"
      ? allPokemon2 : allPokemon2.filter((e) => e.types.some((e )=> e.name === action.payload)
      );
      if(typeFiltered.length < 0){
        typeFiltered = allPokemon2;
        alert ("Error");
      }
      return {
        ...state,
        pokemons: typeFiltered
      };

      case "ORDER_BY_NAME":
            let orderSort;
            if(action.payload === 'Asc'){
               orderSort = state.pokemons.sort(function(a,b){
                    if(a.name > b.name){
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                })
            }else if (action.payload === 'Desc'){
                orderSort = state.pokemons.sort(function(a,b){
                    if(a.name > b.name){
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
            }else if(action.payload === 'Attack+'){
                orderSort = state.pokemons.sort(function(a,b){
                    if(a.attack > b.attack){
                        return -1;
                    }
                    if(b.attack > a.attack){
                        return 1;
                    }
                    return 0;
                })
            }else{
                orderSort = state.pokemons.sort(function(a,b){
                    if(a.attack > b.attack){
                        return 1;
                    }
                    if(b.attack > a.attack){
                        return -1;
                    }
                    return 0;
                })
            }

            return{
                ...state,
                pokemons : orderSort
            };

    default:
      return state;
  }
}

export default rootReducer;
