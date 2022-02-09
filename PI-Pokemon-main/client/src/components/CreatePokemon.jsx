import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes, getPokemon } from '../actions/index';

function validate(input) {
    let errors = {};
    if (input.name === '') {
        errors.name = 'Es necesario un nombre'
    }
    if (input.hp < 0) {
        errors.hp = 'Debe ser mayor a 0'
    }
    if (input.attack < 0) {
        errors.attack = 'Debe ser mayor a 0'
    }
    if (input.defense < 0) {
        errors.defense = 'Debe ser mayor a 0'
    }
    if (input.speed < 0) {
        errors.speed = 'Debe ser mayor a 0'
    }
    if (input.height < 0) {
        errors.height = 'Debe ser mayor a 0'
    }
    if (input.weight < 0) {
        errors.weight = 'Debe ser mayor a 0'
    }
    if (input.types.length === 0) {
        errors.types = 'Debe tener al menos un tipo'
    } else if (!input.image) {
        errors.image = "Please insert an image URL";
    } else if (
        !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(input.image)
    ) {
        errors.image = "Please insert a valid image URL";
    }
    return errors;
}

export default function CreatePokemon() {
    const dispatch = useDispatch();
    //const history = useNavigate();
    const types = useSelector((state) => state.types);
    const pokemons = useSelector((state) => state.pokemons);
    const [input, setInput] = useState({ name: "", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", types: [] });
    const [errors, setErrors] = useState({});
    const [button, setButton] = useState(true);
    const [types2, setTypes] = useState([]);

    useEffect(() => {
        dispatch(getTypes());
        dispatch(getPokemon())
    }, [dispatch])

    return (
        <div>

            <h1 >Crea tu propio Pokemon</h1>
            <form href="1">
                <div>
                    <legend>Name:</legend>
                    <input type='text' value={input.name} name='name' placeholder="Write a name..." title="Only letters and blank spaces are accepted" pattern="^[A-Za-zÑÁáÉéÍíÓóÚúÜü\s]+$" required />
                    {/*<input type="submit" value="Enviar"/>*/}
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                    <legend>Hp:</legend>
                    <input type='number' value={input.hp} name='hp' placeholder="Write the hp of your pokemon..." title="Only numbers are accepted" pattern="[0-9]{3}" required />
                    {/*<input type="submit" value="Enviar"/>*/}
                    {errors.hp && (
                        <p>{errors.hp}</p>
                    )}
                </div>
                <div>
                    <legend>Weight:</legend>
                    <input type='number' value={input.weight} name='weight' placeholder="Write the hp of your pokemon..." title="Only numbers are accepted" pattern="[0-9]{2}" required />
                    {/*<input type="submit" value="Enviar"/>*/}
                    {errors.hp && (
                        <p>{errors.hp}</p>
                    )}
                </div>
                <button>Crear Pokemon</button>

            </form>
        </div>

    )
}
