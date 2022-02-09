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
        const allPokemon = state.allPokemon;
        const createdFilter =
          action.payload === "All"
            ? allPokemon
            : action.payload === "Created"
            ? allPokemon.filter((el) => el.createdInDb === true)
            : allPokemon.filter((el) => !el.createdInDb);
        return {
          ...state,
          pokemons: createdFilter,
        };
        case "FILTER_BY_TYPE":
          const allPokemon2 = state.allPokemon;
          const filterType = allPokemon2.filter((el) => el.types?.includes(action.payload)
          );
          return {
            ...state,
            pokemons: filterType,
          };
          case "ORDER_BY_NAME":
              const orderPokemon=
                  action.payload === "Asc"? state.pokemon.sort(function (a, b){
                      if(a.name>b.name) return 1;
                      if(b.name>a.name) return -1;
                      return 0;})
                      :state.pokemon.sort(function(a,b){
                          if(a.name>b.name) return -1;
                          if(b.name>a.name) return 1;
                          return 0;
                      })
                      return{
                          ...state,
                          pokemons: orderPokemon,
                      }
                      default:
                        return state;
                      
    }
  }
  
  export default rootReducer;
  