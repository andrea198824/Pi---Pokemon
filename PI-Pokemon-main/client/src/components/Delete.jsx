import React from "react";
import { Link } from "react-router-dom";
import s from './CardDog.module.css';
import { useDispatch } from 'react-redux';
import { deleteBreed } from "../actions";

export default function CardDog({ name, image, type, id, remove, removeFunction }) {
    const dispatch = useDispatch();
    return(
    <div >
        {
            remove && <button name='id' value={id} onClick={e => removeFunction(e)} className={s.remove}>X</button>
        }
        <Link to={`/home/${id}`} >
            <img  src={image} alt="Breed without img" />
            <h4 >{name}</h4>

            <h5 >{!Array.isArray(temperament) ? temperament :  temperament.map(t => t.name).join(', ')}</h5>
        </Link>
    </div>
    )
}