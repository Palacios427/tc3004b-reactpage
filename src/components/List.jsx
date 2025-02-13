import React from "react";
import Item from "./Item";

const List = ({ items }) => {
    return ( 
    <>
        {items.map((i)=>(
            <Item item={i} key={i.id}/>
        ))}
    </>
    );
};

export default List;