import './App.css';
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import List from './pages/List';
import Add from './components/Add';
import ResponsiveAppBar from './components/AppBar';
import Login from './pages/Login';
import Home from './pages/Home';
import Hash from './pages/Hash';
import Register from './pages/Register';
import ItemInfo from './components/ItemInfo';

const API_URL = process.env.REACT_APP_API_URL;

// ✅ Ruta protegida
const PrivateRoute = ({ isLogin, children }) => {
  return isLogin ? children : <Navigate to="/" replace />;
};

// ✅ Wrapper que hace login y redirecciona
const LoginWrapper = ({ setIsLogin }) => {
  const navigate = useNavigate();

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
      setIsLogin(data.isLogin);
      navigate("/home"); // ✅ redirige después de login exitoso
    }

    return data.isLogin;
  };

  return <Login login={login} />;
};

function App() {
  const [items, setItems] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  // ✅ Persistencia de sesión
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    if (isLogin) {
      getItems();
    }
  }, [isLogin]);

  const getItems = async () => {
    const token = localStorage.getItem("token");

    const result = await fetch(API_URL + "/items/", {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await result.json();
    setItems(data);
  };

  const add = async (item) => {
    const token = localStorage.getItem("token");

    const result = await fetch(API_URL + "/items/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await result.json();
    setItems([...items, data.item]);
  };

  const del = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(API_URL + `/items/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    setItems(items.filter((item) => item.id !== id));
  };

  const logout = () => {
    setIsLogin(false);
    localStorage.removeItem("token");
  };

  return (
    <div>
      <BrowserRouter>
        {isLogin && <ResponsiveAppBar logout={logout} />}
        <Header />
        <Routes>
          <Route path="/" element={<LoginWrapper setIsLogin={setIsLogin} />} />

          <Route
            path="/home"
            element={
              <PrivateRoute isLogin={isLogin}>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute isLogin={isLogin}>
                <Add add={add} />
              </PrivateRoute>
            }
          />
          <Route
            path="/items"
            element={
              <PrivateRoute isLogin={isLogin}>
                <List items={items} ondelete={del} />
              </PrivateRoute>
            }
          />
          <Route
            path="/items/:id"
            element={
              <PrivateRoute isLogin={isLogin}>
                <ItemInfo items={items} />
              </PrivateRoute>
            }
          />
          <Route path="/hash" element={<Hash />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
