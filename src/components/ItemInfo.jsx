import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const ItemInfo = ({ items }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { id } = useParams();
    const item = items.find((i) => i.id === parseInt(id));

    if (!item) {
        return (
            <div>
                <h1>Item no encontrado</h1>
                <button onClick={() => navigate(-1)}>Volver</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Item Info</h1>
            <h3>{item.name}</h3>
            <h2>{item.price}</h2>
            <h3>Search Param: {searchParams.get("q")}</h3>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
};

export default ItemInfo;