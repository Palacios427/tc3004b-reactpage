import React, { useEffect, useState } from "react";

const LifeCycle = () => {

    const [text, setText] = useState("")

    // ComponentDidMount
    useEffect(()=>{
        console.log("Componente montado");
    }, []);

    // ComponentDidUpdate
    useEffect(()=>{
        console.log("Componente actualizado");
    }, [text])

    // ComponentWillUnmount
    useEffect(()=>{
        return () => console.log("Componente desmontado");
    }, [])

    // Monstar, Actualizar
    useEffect(()=>{
        console.log("Componente siempre");
    })

    return(
        <div>
            <input type="text"
            value={text}
            onChange={(e) => {setText(e.target.value)}}
            />

            <div>{text}</div>
        </div>
    )
};

export default LifeCycle;