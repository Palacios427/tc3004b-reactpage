import React from "react";
import {Link} from "react-router-dom";

const NavLinks = () => {
    return (
        <div>
            <Link to="/add">Add</Link>
            <Link to="/items">Articulos</Link>
        </div>
    );
};

export default  NavLinks;