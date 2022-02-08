import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import '../css/CardDetail.css';


export default function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const detailPokemon = useSelector((state) => state.pokemons);
    console.log(detailPokemon)


    useEffect(() => {
        dispatch(getDetail(id)); //accedo al id pasandole props a mi componente Detail
    }, [dispatch]);

    // me traigo el estado detail desde el reducer con useSelector
    if (!detailPokemon.length) {

        return (
            <Loading/>
        )

    } else {

        return (
            <div >
                {
                    detailPokemon?.map((c) => {
                        return (
                            <React.Fragment>

                                <div>
                                    <div >
                                        <h1>{c.name.charAt(0).toUpperCase() + c.name.slice(1)}</h1>
                                        <img src={c.imageDetail} alt='Img not found' />
                                        <h2>Type: {c.types.map((c) => c.name)}</h2>
                                        <h3>Id: {c.id}</h3>
                                        <h3>Statistics:
                                            attack - {c.attack}, defense - {c.defense},
                                            speed - {c.speed}, Hp - {c.hp}</h3>
                                        <h3>Heigh: {c.height}</h3>
                                        <h3>Weight: {c.weight}</h3>
                                    </div>
                                </div>
                                <Link to='/home'>
                                    <button type='submit' name='submit'> Volver </button>
                                </Link>

                            </React.Fragment>
                        )
                    })
                }

            </div>

        )
    }

}

