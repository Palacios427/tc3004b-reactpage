import { useState, useCallback } from 'react';

const API_URL = process.env.REACT_APP_API_URL;

const useItems = (token) => {
    const [items, setItems] = useState([]);

    const getItems = useCallback(async () => {
        if (!token) return;
        
        try {
            const result = await fetch(API_URL + "/items/", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            const data = await result.json();
            setItems(data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    }, [token]);

    const add = useCallback(async (item) => {
        if (!token) return;

        try {
            const result = await fetch(API_URL + "/items/", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });
            const data = await result.json();
            setItems(prevItems => [...prevItems, data.item]);
        } catch (error) {
            console.error("Error adding item:", error);
        }
    }, [token]);

    const del = useCallback(async (id) => {
        if (!token) return;

        try {
            await fetch(API_URL + `/items/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            setItems(prevItems => prevItems.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }, [token]);

    return { items, getItems, addItem: add, delItem: del };
};

export default useItems;
