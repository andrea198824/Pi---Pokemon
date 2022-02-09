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



    // function handleChange(e) {
    //     e.preventDefault();
    //     setInput({
    //         ...input,
    //         [e.target.name]: e.target.value,
    //     });
    //     setErrors(
    //         validate({
    //             ...input,
    //             [e.target.name]: e.target.value,
    //         })
    //     );
    //     console.log(input);
    // }


    // function handleSelect(e) {

    //     setInput({
    //         ...input,
    //         types: Array.from(new Set([...input.types, e.target.value]))
    //     })

    //     if (input.name === '' || input.hp === '' || input.attack === '' || input.defense === '' || input.height === '' || input.weight === '' || input.types.length < 0) {
    //         setButton(true)
    //     } else {
    //         setButton(false)
    //     }

    // }





    // function handleSubmit(e) {
    //     e.preventDefault();
    //     if (pokemons.find((poke) => poke.name.toLowerCase() === input.name.toLowerCase().trim())) {
    //         alert("Ya existe el Pokemon");
    //         setErrors({
    //             ...input,
    //             [e.target.name]: "Pokémon duplicated",
    //         });
    //         history.push('/home')
    //     } else {
    //         dispatch(postPokemon(input));
    //         alert('Pokemon Created');
    //         setInput({
    //             name: "", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", types: []
    //         });
    //         history.push('/home');
    //     }


    // }

    // function handleDelete(e) {
    //     e.preventDefault();
    //     setTypes(types.filter((types) => types !== e.target.value));
    //     console.log(types);
    //     console.log(e.target.value);
    // }



    return (
        <div >

            <h1 >Crea tu propio Pokemon</h1>
            <form>
                <legend>Name:</legend>
                <input type='text' name='name' placeholder="Write a name..." title="Only letters and blank spaces are accepted" pattern="^[A-Za-zÑÁáÉéÍíÓóÚúÜü\s]+$" required />
                {/*<input type="submit" value="Enviar"/>*/}
                {errors.name && (
                    <p>{errors.name}</p>
                )}
            </form>
        </div>

    )
}
