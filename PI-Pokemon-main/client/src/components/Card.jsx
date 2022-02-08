import React from "react";


export default function Card({name, image, types }){
    return (
        <div> 
            <div >               
            <p >{name}</p>
            </div>
            <image
            src={image}
            alt='Image not found'
            width='240px'
            height='180px'
          />
            <div >
            <h6>Tipo: {types}</h6>
            </div>
            <br/>

        </div>
    );
}