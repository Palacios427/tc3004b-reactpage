import React from "react";
import Boton from "./Boton";
import { Link } from "react-router-dom";

const Item = ({ item, ondelete }) => {
    return(
    <div>
        <ul>
            <Link to ={"/items/" + item.id + "?q=react55"}>
                <li>{item.name}</li>
            </Link>
            <li>{item.price}</li>
            <li><Boton item={item} key={item.id} ondelete={ondelete}/></li>
        </ul>
    </div>
    )
};

export default Item;