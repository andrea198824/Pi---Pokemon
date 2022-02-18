import "../css/CreatePokemon.css"
import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes, getPokemon, deletePokemon } from '../actions/index';

function validate(input) {
    let errors = {};
    if (input.name === '') {
        errors.name = 'Name is required'
    }
    if (input.hp < 0) {
        errors.hp = 'Should be greater than zero'
    }
    if (input.attack < 0) {
        errors.attack = 'Should be greater than zero'
    }
    if (input.defense < 0) {
        errors.defense = 'Should be greater than zero'
    }
    if (input.speed < 0) {
        errors.speed = 'Should be greater than zero'
    }
    if (input.height < 0) {
        errors.height = 'Should be greater than zero'
    }
    if (input.weight < 0) {
        errors.weight = 'Should be greater than zero'
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
    const navigate = useNavigate();
    const [input, setInput] = useState({ name: "", image: "", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", types: [] });
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

        if (input.name === '' || input.image === '' || input.hp === '' || input.attack === '' || input.defense === '' || input.height === '' || input.weight === '' || input.types.length < 0) {
            setButton(true)
        } else {
            setButton(false)
        }

    }

    function handleSubmit(e) {
        e.preventDefault();
        if (pokemons.find((poke) => poke.name.toLowerCase() === input.name.toLowerCase().trim())) {
            alert("Pokémon duplicated");
            setErrors({
                ...input,
                [e.target.name]: "Pokémon duplicated",
            });
            navigate('/home')
        } else {
            dispatch(postPokemon(input));
            alert('Pokemon Created');
            setInput({
                name: "", hp: "", attack: "", defense: "", speed: "", height: "", weight: "", types: []
            });
            navigate('/home');
        }
    }
    const handleDelete = e => {

        setTypes(types2.filter((temp) => temp !== e.target.value))
    };


    return (
        <div className="body">
            <div className="create">
                <h1>Create your own Pokemon!</h1>
                <form className="boxo" onSubmit={handleSubmit}>
                    <label className='cyd'>Name: </label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        placeholder='Name...'
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
                    <label className='cyd'>Attack: </label>
                    <input
                        type='number'
                        value={input.attack}
                        name='attack'
                        placeholder='Attack...'
                        onChange={handleOnChange}

                    />
                    {errors.attack && (<p>{errors.attack}</p>)}
                    <label className='cyd'>Defense: </label>
                    <input
                        type='number'
                        value={input.defense}
                        name='defense'
                        placeholder='Defense...'
                        onChange={handleOnChange}

                    />
                    {errors.defense && (<p >{errors.defense}</p>)}
                    <label className='cyd' >Speed: </label>
                    <input
                        type='number'
                        value={input.speed}
                        name='speed'
                        placeholder='Speed...'
                        onChange={handleOnChange}

                    />
                    {errors.speed && (<p>{errors.speed}</p>)}
                    <label className='cyd'>Height: </label>
                    <input
                        type='number'
                        value={input.height}
                        name='height'
                        placeholder='Height...'
                        onChange={handleOnChange}

                    />
                    {errors.height && (<p>{errors.height}</p>)}
                    <label className='cyd'>Weight: </label>
                    <input
                        type='number'
                        value={input.weight}
                        name='weight'
                        placeholder='Weight...'
                        onChange={handleOnChange}

                    />
                    <label className='cyd'>Image: </label>
                    <input
                        type='text'
                        value={input.image}
                        name='image'
                        placeholder='URL image'
                        onChange={(e) => handleOnChange(e)}
                    />
                    {errors.image && <p>{errors.image}</p>}
                    <div className='cyd'>
                        <label >Type: </label>
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


                            {/* {types2.map((t) => {
                                return (
                                    <React.Fragment key={t}>

                                        <div>
                                            {t}
                                            <button value={t} onClick={(t) => handleDelete(t)}>
                                                x
                                            </button>
                                        </div>
                                    </React.Fragment>
                                );
                            })} */}
                        </div>
                            <br/>
                    {/*errors.types && (<p className={style.error}>{errors.types}</p>) */}
                    
                    <button type='submit' name='submit' >Create</button>
                    <Link to='/home'>
                        <button className="back" type='submit' name='submit'>Back</button>
                    </Link>
                </form>

                <div>{input.types?.map(e => {
                        return(
                            <div>
                                {e}
                                <button  onClick={() => handleDelete()}>
                                                x
                                            </button>
                            </div>
                        )
                    }
                    )}</div>
            </div >
        </div >
    )
}

export default CreatePokemon;