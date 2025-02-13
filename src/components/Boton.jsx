import React from "react";

const Boton = ({nombre, click}) => {
    return <button onClick={click}>{nombre}</button>
};

export default Boton;