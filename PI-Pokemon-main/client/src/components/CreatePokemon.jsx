import "../css/CreatePokemon.css"
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

export function CreatePokemon() {
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const pokemons = useSelector((state) => state.pokemons);
    const history = useNavigate();
    const [input, setInput] = useState({ name: "", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", types: [] });
    const [errors, setErrors] = useState({});
    const [button, setButton] = useState(true);
    const [types2, setTypes] = useState([]);


    useEffect(() => {
        dispatch(getTypes());
        dispatch(getPokemon())
    }, [dispatch])

    function handleOnChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    function handleSelect(e) {

        setInput({
            ...input,
            types: Array.from(new Set([...input.types, e.target.value]))
        })

        if (input.name === '' || input.hp === '' || input.attack === '' || input.defense === '' || input.height === '' || input.weight === '' || input.types.length < 0) {
            setButton(true)
        } else {
            setButton(false)
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        if (pokemons.find((poke) => poke.name.toLowerCase() === input.name.toLowerCase().trim())) {
            alert("Ya existe el Pokemon");
            setErrors({
                ...input,
                [e.target.name]: "Pokémon duplicated",
            });
            history.push('/home')
        } else {
            dispatch(postPokemon(input));
            alert('Pokemon Created');
            setInput({
                name: "", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", types: []
            });
            history.push('/home');
        }
    }
    function handleDelete(e) {
        e.preventDefault();
        setTypes(types2.filter((typ) => typ !== e.target.value));
        console.log(types2);
        console.log(e.target.value);
    }


    return (
        <div className="body">
            <div className="create">
                <h1>Creá tu propio Pokemon</h1>
                <form className="boxo" onSubmit={handleSubmit}>
                    <label className='cyd'>Nombre: </label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        placeholder='Nombre...'
                        onChange={handleOnChange}

                    />
                    {errors.name && (<p >{errors.name}</p>)}
                    <label className='cyd'>HP: </label>
                    <input
                        type='number'
                        value={input.hp}
                        name='hp'
                        placeholder='HP...'
                        onChange={handleOnChange}

                    />
                    {errors.hp && (<p>{errors.hp}</p>)}
                    <label className='cyd'>Ataque: </label>
                    <input
                        type='number'
                        value={input.attack}
                        name='attack'
                        placeholder='Ataque...'
                        onChange={handleOnChange}

                    />
                    {errors.attack && (<p>{errors.attack}</p>)}
                    <label className='cyd'>Defensa: </label>
                    <input
                        type='number'
                        value={input.defense}
                        name='defense'
                        placeholder='Defensa...'
                        onChange={handleOnChange}

                    />
                    {errors.defense && (<p >{errors.defense}</p>)}
                    <label className='cyd' >Velocidad: </label>
                    <input
                        type='number'
                        value={input.speed}
                        name='speed'
                        placeholder='Velocidad...'
                        onChange={handleOnChange}

                    />
                    {errors.speed && (<p>{errors.speed}</p>)}
                    <label className='cyd'>Altura: </label>
                    <input
                        type='number'
                        value={input.height}
                        name='height'
                        placeholder='Altura...'
                        onChange={handleOnChange}

                    />
                    {errors.height && (<p>{errors.height}</p>)}
                    <label className='cyd'>Peso: </label>
                    <input
                        type='number'
                        value={input.weight}
                        name='weight'
                        placeholder='Peso...'
                        onChange={handleOnChange}

                    />
                    {errors.weight && (<p>{errors.weight}</p>)}
                    <label className='cyd'>Type: </label>
                    <select
                            name='type'
                            onChange={(e) => handleSelect(e)}
                            type='text'
                        >
                            <option value={null}></option>
                            {types.map((typ, id) => {

                                return (
                                    <option key={id} value={typ.name}>
                                        {typ.name}
                                    </option>
                                );
                            })}
                        </select>
                    {types2.map((typ, id) => {

                        return (
                            <React.Fragment key={id}>
                                <div>
                                    {typ}
                                    <button
                                        value={typ}
                                        onClick={(e) => handleDelete(e)}
                                    >
                                        x
                                    </button>
                                </div>
                            </React.Fragment>
                        );
                    })}
          
            {/*errors.types && (<p className={style.error}>{errors.types}</p>)*/}
            <ul ><li >{input.types?.map(e => e + ' ')}</li></ul>
            <button >Create a Pokemon</button>
            <Link to='/home'>
                <button type='submit' name='submit'>Volver</button>
            </Link>
        </form>
            </div >
        </div >
    )
}

export default CreatePokemon;