import React from "react";
import {Link} from 'react-router-dom';
import '../css/LandingPage.css'

export default function LandingPage(){
    return ( 
        <div className="lpage">
            <h2 className="ltext2">Welcome to pokewmon´s world!</h2>
            <h1 className="ltext">
                <button className="buttom">
                <Link to='/home'> Join </Link>
                </button>
            </h1>
        </div>
    )
    
}