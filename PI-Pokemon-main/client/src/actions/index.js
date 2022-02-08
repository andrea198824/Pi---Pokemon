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
  return async function (dispatch) {
    var json = await axios.post("http://localhost:3001/pokemons", payload);
    return dispatch({
      type: "POST_POKEMON",
      payload: json.data,
    });
  };
}

export function filterPokemonCreated(payload) {
  return {
    type: "FILTER_POKEMON_CREATED",
    payload,
  };
}

export function filterPokemonType(payload) {
  return {
    type: "FILTER_BY_TYPE",
    payload,
  };
}
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

