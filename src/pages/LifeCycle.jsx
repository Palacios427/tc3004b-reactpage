import React, { useState } from "react";

const LifeCycle = () => {

    const [text, setText] = useState("")

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