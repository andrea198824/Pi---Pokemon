import React from "react";


export default function Card({name, image, type }){
    return (
        <div> 
            <div >               
            <p >{name}</p>
            </div>
            <img
            src={image}
            alt='Image not found'
            width='240px'
            height='180px'
          />
            <div >
            <h6>Tipo: {type}</h6>
            </div>
            <br/>

        </div>
    );
}