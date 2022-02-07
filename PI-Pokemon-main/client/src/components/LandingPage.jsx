import React from "react";
import {Link} from 'react-router-dom';
import '../css/LandingPage.css'

export default function LandingPage(){
    return ( 
        <div className="lpage">
            <h2 className="ltext2">Bienvenido al mundo Pokemon</h2>
            <h1 className="ltext">
                <button className="buttom">
                <Link to='/home'> Ingresar </Link>
                </button>
            </h1>
        </div>
    )
    
}