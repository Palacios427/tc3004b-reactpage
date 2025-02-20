import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div>
            <h1>Header</h1>
            <Link to="/add">Add</Link>
            <Link to="/items">Articulos</Link>
        </div>
    );
};

export default Header;