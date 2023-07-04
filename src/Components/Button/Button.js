import React from "react";
import  './Button.css';

const button = (props) =>
(
    <button className="Button" type={props.type} disabled = {props.disabled} onClick={props.click}>{props.children}</button>
)

export default button; 