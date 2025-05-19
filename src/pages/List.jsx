import React from "react";
import Item from "../components/Item";

const List = ({ items, ondelete }) => {
    return ( 
    <>
    <table>
        <thead><tr><td>Name</td><td>Delete</td></tr></thead>
        <tbody>
            {items.map((i)=>(
                <Item item={i} key={i.id} ondelete={ondelete}/>
            ))}
        </tbody>
    </table>
    </>
    );
};

export default List;