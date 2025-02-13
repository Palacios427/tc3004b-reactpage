import React, { useState } from "react";
import Boton from "./Boton";

const Add = () => {
    const [name, setName] = useState("");

    return (
        <div>
            <input onChange={(e) => setName(e.target.value)}
            type="text"
            name=""
            id=""
            />
            {name}
            <input type="text" name="" id="" />
            <Boton nombre="Agregar" />
        </div>
    );
};

export default Add;