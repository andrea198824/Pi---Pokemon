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
      let filterCreated =
        action.payload === "Created"
          ? pokemonsCreated.filter((e) => e.createdId)
          : pokemonsCreated.filter((e) => !e.createdId);

      return {
        ...state,
        pokemons: action.payload === "all" ? state.allPokemon : filterCreated,
      };

    case "FILTER_BY_TYPE":
      const allPokemon2 = state.allPokemon;
      const filterType = allPokemon2.filter((el) =>
        el.types?.includes(action.payload)
      );
      return {
        ...state,
        pokemons: filterType,
      };
      case "ORDER_BY_NAME":
        let orderPokemon;
        if(action.payload === 'Asc'){
          orderPokemon = state.pokemons.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            })
        }else if (action.payload === 'Desc'){
          orderPokemon = state.pokemons.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
        }else if(action.payload === 'attack+'){
          orderPokemon = state.pokemons.sort(function(a,b){
                if(a.attack > b.attack){
                    return -1;
                }
                if(b.attack > a.attack){
                    return 1;
                }
                return 0;
            })
        }else{
          orderPokemon = state.pokemons.sort(function(a,b){
                if(a.attack > b.attack){
                    return 1;
                }
                if(b.attack > a.attack){
                    return -1;
                }
                return 0;
            })
        }
      return {
        ...state,
        pokemons: orderPokemon,
      };

    default:
      return state;
  }
}

export default rootReducer;
