import React from "react";
import Item from "./item";

const List = ({ items }) => {
    return ( 
    <>
        {items.map((i)=>(
            <Item key = {i.price} item={i}/>
        ))}
    </>
    );
};

export default List;