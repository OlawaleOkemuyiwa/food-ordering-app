import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";

import classes from './Modal.module.css';

const Overlay = props => {

    return (
        <React.Fragment>
            <div className={classes.backdrop} onClick={props.onClose}></div>
            <Card className={classes['modal-overlay']}> 
                {props.children}
            </Card>
        </React.Fragment>
    )

}

const Modal = props => {

    const portalElement = document.getElementById('overlay-root');

    return (
        ReactDOM.createPortal(<Overlay onClose={props.onClose}>{props.children}</Overlay>, portalElement)
    )

}

export default Modal;