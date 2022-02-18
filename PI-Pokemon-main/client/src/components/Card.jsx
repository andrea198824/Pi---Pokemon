import React from "react";
import '../css/Card.css'


export default function Card({name, image, types}){

    return (
        <div> 
            <div className="caja" >               
            <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>

            <img
            src={image}
            alt='Image not found'
            width='240px'
            height='180px'
          />
            <div className="type" >
            <h6>Type: {types}</h6>
            </div>
            </div>
            <br/>

        </div>
    );
}