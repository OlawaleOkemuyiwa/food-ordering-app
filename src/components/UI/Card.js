import React from "react";

import classes from './Card.module.css';

const Card = props => {

    let styling = classes.card;
    if(props.className) {
        styling = `${styling} ${props.className}`
    }

    return (
        <div className={styling}>
            {props.children}
        </div>
    )
}

export default Card;