import React from "react";
import Item from "../components/Item";
import NavLinks from "./NavLinks";

const List = ({ items, ondelete }) => {
    return ( 
    <>
        <NavLinks />

        {items.map((i)=>(
            <Item item={i} key={i.id} ondelete={ondelete}/>
        ))}
    </>
    );
};

export default List;