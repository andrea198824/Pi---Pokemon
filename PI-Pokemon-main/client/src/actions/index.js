import axios from "axios";

export function getPokemon() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons");
    console.log(json);
    return dispatch({
      type: "GET_POKEMON",
      payload: json.data,
    });
    
  };
}


export function getTypes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/type");
    return dispatch({
      type: "GET_TYPE",
      payload: json.data,
    });
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/pokemons/${id}`);
    return dispatch({
      type: "GET_DETAIL",
      payload: json.data,
    });
  };
}

export function getDetailByName(name) {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/pokemons/?name=" + name);
    return dispatch({
      type: "SEARCH_POKEMON",
      payload: json.data,
    });
  };
}


export function postPokemon(payload) {
  return function(dispatch){
      return fetch('http://localhost:3001/pokemon',{
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify(payload)
      })
          .then(response =>response.json())
          .then((json)=>{
              dispatch({type: "POST_POKEMON", payload: json});
          })
          .catch((error) =>{console.log(error)})
  }
  
}

export function filterPokemonCreated(payload) {
  return {
    type: "FILTER_POKEMON_CREATED",
    payload: payload,
  };
}

export function filterPokemonType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload: payload,
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload: payload,
  };
}


