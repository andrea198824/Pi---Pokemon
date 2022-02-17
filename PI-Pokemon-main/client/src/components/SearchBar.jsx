import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDetailByName, getDetailBySpeed } from "../actions";
import '../css/SearchBar.css';



export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');


  
  //lo que está tipeando el usuario va a ser mi estado local name


  function handleIn(e) {
    e.preventDefault();
    setName(e.target.value);
    setSpeed(e.target.value); //el value del input que ingresa por búsqueda va a setear el value del state
  }

  function handleSub(e) {
    e.preventDefault();
    dispatch(getDetailByName(name));
    dispatch(getDetailBySpeed(speed));//acá lo que tipea el usuario le llega desde el estado local a la función que llama al back con ese name
    setName(''); //para que cuando ya se hizo la busqueda no me siga mostrando el nombre ingresado, seteo el nombre en comillas
  }

 return (
<div >
  <h3 className="textoBar">Search your pokemon</h3>
      <form onSubmit={handleSub}>
        <input type="text" onChange={handleIn} value={name, speed} />
        
        <input type="submit" value="Search..." />
      </form>
    </div>
  );
 } 