import React from "react";

const Item = ({ item }) => {
    return(
    <div>
        <ol>
            <li>{item.name}</li>
            <li>{item.name}</li>
            <li>{item.name}</li>
        </ol>
    </div>
    )
};

export default Item;