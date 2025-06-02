import { useState, useEffect } from "react";

const API_URL = process.env.REACT_APP_API_URL;

const useAuth = () => {
    const [isLogin, setIsLogin] = useState(() => {
        // Initialize isLogin based on token presence in localStorage
        return !!localStorage.getItem("token");
    });
    const [token, setToken] = useState(localStorage.getItem("token"));

    // ✅ Persistencia de sesión
    useEffect(() => {
        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [token]);

    const login = async (user) => {
        const result = await fetch(API_URL + "/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        const contentType = result.headers.get("content-type");
        const text = await result.text();

        if (!contentType || !contentType.includes("application/json")) {
            console.error("Respuesta no es JSON válida:", text);
            throw new Error("La respuesta no es JSON.");
        }

        const data = JSON.parse(text);

        if (data.token) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            setIsLogin(true);
        }

        return data;
    };

    const logout = () => {
        setIsLogin(false);
        setToken(null);
        localStorage.removeItem("token");
    };

    return {
        isLogin,
        token,
        login,
        logout
    };
};

export default useAuth;