import React from "react";

const Item = ({ item }) => {
    return(
    <div>
        <ul>
            <li>{item.name}</li>
            <li>{item.price}</li>
        </ul>
    </div>
    )
};

export default Item;